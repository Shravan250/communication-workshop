import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const difficultyArray = ["easy", "medium", "hard"];

// const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { difficulty } = await req.json();

    if (!difficultyArray.includes(difficulty)) {
      return NextResponse.json(
        { error: "Invalid difficulty level" },
        { status: 400 }
      );
    }
    console.log("API KEY:", process.env.GROQ_API_KEY);

    const prompt = getScenarioPrompt(difficulty);

    // const scenario = await client.responses.create({
    //   model: MODEL,
    //   input: prompt,
    // });

    const response = await client.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "openai/gpt-oss-20b",
    });

    const scenario = response.choices[0].message.content;
    console.log(response);
    console.log(scenario);
    return NextResponse.json({ scenario });
  } catch (error) {
    console.error("Error generating scenario:", error);
    return NextResponse.json(
      { error: "Failed to generate scenario" },
      { status: 500 }
    );
  }
}

function getScenarioPrompt(difficulty: string): string {
  const baseInstruction = `Generate a realistic workplace email scenario for communication practice. 
The scenario should be 2-3 sentences describing a situation where the user needs to write a professional email.

Difficulty: ${difficulty}`;

  const difficultyGuidance = {
    easy: `Create a simple, straightforward workplace situation:
- Requesting information from a colleague
- Thanking someone for their help
- Confirming a meeting
- Simple status update
Keep it low-stakes and clear.`,

    medium: `Create a cross-functional communication scenario:
- Coordinating between departments
- Explaining a delay or issue
- Requesting resources or approval
- Following up on a pending matter
Add moderate complexity with multiple stakeholders.`,

    hard: `Create a nuanced, layered corporate challenge:
- Diplomatic disagreement or pushback
- Navigating organizational politics
- Delivering difficult news professionally
- Complex stakeholder management
Include subtle challenges requiring tact and strategy.`,
  };

  return `${baseInstruction}

${difficultyGuidance[difficulty as keyof typeof difficultyGuidance]}

Output only the scenario description, no preamble or explanation.`;
}
