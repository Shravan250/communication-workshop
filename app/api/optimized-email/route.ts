import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

// const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { scenario, userEmail, tone } = await req.json();

    if (!scenario || !tone) {
      return NextResponse.json(
        { error: "Invalid scenario or tone level" },
        { status: 400 }
      );
    }

    const prompt = getAnswerPrompt(scenario, userEmail, tone);

    const response = await client.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "openai/gpt-oss-20b",
    });

    const responseText = response.choices[0].message.content;
    const optimizedEmail = JSON.parse(
      responseText!.replace(/```json\n?|\n?```/g, "").trim()
    );

    console.log(optimizedEmail);
    return NextResponse.json({ optimizedEmail });
  } catch (error) {
    console.error("Error generating scenario:", error);
    return NextResponse.json(
      { error: "Failed to generate scenario" },
      { status: 500 }
    );
  }
}

function getAnswerPrompt(scenario: string, userEmail: string, tone: number) {
  const prompt = `You are rewriting an email to optimize it professionally.

Do not include markdown, comments, or any text outside the JSON object.

**Scenario:**
${scenario}

**Original Email:**
${userEmail}

**Tone Target (0-100 scale: ${tone}):**
${getToneDescription(tone)}

**Your Task:**
Rewrite this email to be polished, structured, and professional while maintaining the user's core intent.

**Guidelines:**
- Keep the same purpose and key points
- Apply the specified tone level
- Improve clarity and structure
- Remove redundancy
- Make it more concise if possible
- Ensure it sounds human, not robotic
- Match standard professional email format

**Output Format (JSON only):**
{
  "subject": "",
  "body": "",
  "signature": ""
}`;

  return prompt;
}

function getToneDescription(tone: number): string {
  if (tone <= 20) {
    return "Very relaxed and friendly. Warm, conversational, approachable. Like talking to a trusted colleague.";
  } else if (tone <= 40) {
    return "Friendly professional. Warm but maintains professionalism. Personable yet appropriate.";
  } else if (tone <= 60) {
    return "Balanced corporate. Professional and clear. Standard business communication style.";
  } else if (tone <= 80) {
    return "Formal corporate. More structured and diplomatic. Carefully worded for senior stakeholders.";
  } else {
    return "Full polished corporate. Maximum formality and diplomatic language. Executive-level communication.";
  }
}
