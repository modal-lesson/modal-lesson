import { type NextRequest, type NextResponse } from "next/server";
import { env } from "~/env.mjs";

export const config = {
  runtime: "edge",
};

type Body = {
  title: string;
  students: string;
  grade: string;
  subject: string;
  length: string;
};

export default async function handler(req: NextRequest, _res: NextResponse) {
  const body = (await req.json()) as Body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `
            Create a lesson plan with the following requirements:
            - The lesson plan title is ${body.title}
            - The lesson plan should be for a class of ${body.students} students
            - The lesson plan is for a ${body.grade} grade math class
            - The lesson plan should be for the subject ${body.subject}
            - The lesson plan should be ${body.length} minutes long
            `,
          },
        ],
      }),
    });

    const data = (await response.json()) as {
      choices: { message: { content: string[] } }[];
    };

    const attributes = data.choices[0]?.message?.content;

    return new Response(
      JSON.stringify({
        attributes,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log("Something went wrong: ", { catch: error });
  }
}
