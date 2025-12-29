import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

export interface EvaluationResponse {
  metrics: {
    clarity: number;
    tone: number;
    structure: number;
    professionalism: number;
  };
  highlight: string;
  suggestion: string;
  encouragement: string;
}

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { scenario, form } = await req.json();

    const userEmail = `
    To: ${form.to}
    Subject: ${form.subject}

    ${form.body}
    `;

    if (!scenario || !userEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const response = await client.chat.completions.create({
      messages: [
        {
          role: "user",
          content: getEvaluateEmailPrompt(scenario, userEmail),
        },
      ],
      model: "openai/gpt-oss-20b",
    });

    const responseText = response.choices[0].message.content;

    if (!responseText) return null;

    // Parse JSON response
    const evaluation: EvaluationResponse = JSON.parse(
      responseText.replace(/```json\n?|\n?```/g, "").trim()
    );
    console.log(evaluation);
    return NextResponse.json(evaluation);
  } catch (error) {
    console.error("Error evaluating email:", error);
    return NextResponse.json(
      { error: "Failed to evaluate email" },
      { status: 500 }
    );
  }
}

function getEvaluateEmailPrompt(scenario: string, userEmail: string) {
  const prompt = `You are a friendly, encouraging communication mentor evaluating a practice email.

**Scenario:**
${scenario}

**User's Email:**
${userEmail}

**Your Task:**
Evaluate this email with a warm, supportive tone. You're helping someone improve, not judging them.

**Evaluation Criteria:**

1. **Scores (3.0 to 5.0 scale):**
   - Clarity: How clear and easy to understand
   - Tone: Professional yet human
   - Structure: Organization and flow
   - Professionalism: Appropriate for workplace
   
   Guidelines:
   - Never score below 3.0 (this is practice, not judgment)
   - Occasionally give one or two 5.0s to create "wins"
   - Never give all 5.0s at once
   - Most scores should be 3.5-4.5 range

2. **Highlight (2-3 sentences):**
   Point out something genuinely done well. Be specific and encouraging.

3. **Improvement Suggestion (1-2 sentences):**
   Offer ONE gentle, actionable improvement. Focus on potential, not failure.

4. **Encouraging Closing Line (1 sentence):**
   End with motivation. Examples:
   - "Good momentum here — you're shaping your instincts well."
   - "This opening carries confidence; refine the middle a bit and it'll shine."

**Output Format (JSON only):**
{
  "metrics": {
    "clarity": 4.0,
    "tone": 4.5,
    "structure": 3.5,
    "professionalism": 4.0
  },
  "highlight": "Your opening is direct and sets clear context...",
  "suggestion": "Consider adding a specific timeline...",
  "encouragement": "Strong work — you're building solid instincts."
}`;

  return prompt;
}
