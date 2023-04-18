import { Select, TextInput, Button } from "@mantine/core";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { env } from "~/env.mjs";

const options = [
  { value: "kindergarten", label: "Kindergarten" },
  { value: "first-grade", label: "First Grade" },
  { value: "second-grade", label: "Second Grade" },
  { value: "third-grade", label: "Third Grade" },
  { value: "fourth-grade", label: "Fourth Grade" },
  { value: "fifth-grade", label: "Fifth Grade" },
  { value: "sixth-grade", label: "Sixth Grade" },
  { value: "seventh-grade", label: "Seventh Grade" },
  { value: "eighth-grade", label: "Eighth Grade" },
  { value: "ninth-grade", label: "Ninth Grade" },
  { value: "tenth-grade", label: "Tenth Grade" },
  { value: "eleventh-grade", label: "Eleventh Grade" },
  { value: "twelfth-grade", label: "Twelfth Grade" },
];

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
    return <div>{generatedPrompt}</div>;
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
              data={options}
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
