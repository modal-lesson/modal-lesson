import { OpenAIStream, type OpenAIStreamPayload } from "~/utils/OpenAIStream";

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  const { title, students, grade, subject, length } = (await req.json()) as {
    title: string;
    students: string;
    grade: string;
    subject: string;
    length: string;
  };

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `
                Create a lesson plan with the following requirements:
                - The lesson plan title is ${title}
                - The lesson plan should be for a class of ${students} students
                - The lesson plan is for a ${grade} grade math class
                - The lesson plan should be for the subject ${subject}
                - The lesson plan should be ${length} minutes long
                `,
      },
    ],
    stream: true,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;
