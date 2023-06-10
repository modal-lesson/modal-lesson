import { Select, TextInput, Button } from "@mantine/core";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { env } from "~/env.mjs";
import { GRADE_OPTIONS } from "~/constants";
import { MainLayout } from "~/layout/MainLayout";

type FormValues = {
  title: string;
  students: string;
  grade: string;
  subject: string;
  length: string;
};

export default function Page() {
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      title: "",
      students: "",
      grade: "",
      subject: "",
      length: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${env.NEXT_PUBLIC_BASE_URL}/api/ai/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data }),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const dataBody = response.body;
      if (!dataBody) {
        return;
      }

      const reader = dataBody.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        if (value === undefined) {
          done = true;
          break;
        }
        done = doneReading;
        const chunkValue = decoder.decode(value);
        setGeneratedPrompt((prev) => prev + chunkValue);
      }
      setLoading(false);
    } catch (error) {
      console.log("Something went wrong: ", { catch: error });
    } finally {
      setLoading(false);
    }
  };

  if (generatedPrompt) {
    //TODO: Generate this as a function instead.
    const formattedPrompt = generatedPrompt.replace(/\n\n/g, "<br />");
    return (
      <>
        <div dangerouslySetInnerHTML={{ __html: formattedPrompt }} />

        {loading ? null : (
          <div className="flex flex-col">
            <Button>Save Lesson</Button>
            <Button>Generate another lesson</Button>
          </div>
        )}
      </>
    );
  }

  return (
    <div>
      <h1>Generate Lesson Plan using AI</h1>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          {...register("title")}
          placeholder="Lesson Title"
          label="Lesson Title"
          required
        />
        <Controller
          name="grade"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label="Grade Level"
              placeholder="Pick one"
              data={GRADE_OPTIONS}
              required
            />
          )}
        />

        <TextInput
          {...register("subject")}
          placeholder="Subject"
          label="Subject"
          required
        />
        <TextInput
          {...register("students")}
          placeholder="Amount of Students"
          label="Amount of Students"
          required
          type="number"
        />
        <TextInput
          {...register("length")}
          placeholder="Length of Lesson Plan"
          label="Length of Lesson Plan"
          required
        />
        <Button
          loading={loading}
          className="!bg-primary hover:!bg-primary-hover"
          type="submit"
        >
          {loading ? "Generating Lesson Plan.." : "Generate Lesson Plan"}
        </Button>
      </form>
    </div>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
