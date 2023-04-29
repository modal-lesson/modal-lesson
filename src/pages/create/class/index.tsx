import { ActionIcon, Button, TextInput } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { Select } from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";
import { type MutableRefObject, useRef } from "react";
import { GRADE_OPTIONS } from "~/constants";

type ClassFormValues = {
  className: string;
  grade: string;
  numberOfStudents: string;
  classStartDate: string;
  classEndDate: string;
  classStartTime: string;
  classEndTime: string;
};

export default function Page() {
  // Ref is here to use Browser input vs the render from the controller.
  const timeStartRef = useRef() as MutableRefObject<HTMLInputElement>;
  const timeEndRef = useRef() as MutableRefObject<HTMLInputElement>;

  const { register, control, handleSubmit } = useForm<ClassFormValues>({
    defaultValues: {
      className: "",
      grade: "",
      numberOfStudents: "",
      classStartDate: "",
      classEndDate: "",
      classStartTime: "",
      classEndTime: "",
    },
  });

  const onSubmit = (data: ClassFormValues) => {
    console.log(data);
  };

  return (
    <div>
      <h1>Create your class</h1>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          {...register("className")}
          placeholder="Class Name"
          label="Class name"
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
            />
          )}
        />
        <TextInput
          {...register("numberOfStudents")}
          placeholder="Number of students"
          label="Number of students"
        />
        {/* fix value type here */}
        <Controller
          name="classStartDate"
          control={control}
          render={({ field: { value, onChange, ...field } }) => (
            <DateInput
              {...field}
              value={value as unknown as Date}
              onChange={onChange}
              label="Class Start Date"
              placeholder="Start Date"
              maw={400}
              mx="auto"
            />
          )}
        />
        <Controller
          name="classEndDate"
          control={control}
          render={({ field: { value, onChange, ...field } }) => (
            <DateInput
              {...field}
              value={value as unknown as Date}
              onChange={onChange}
              label="Class End Date"
              placeholder="End date"
              maw={400}
              mx="auto"
            />
          )}
        />
        <Controller
          name="classStartTime"
          control={control}
          render={({ field: { ...field } }) => (
            <TimeInput
              {...field}
              label="Class start time (click icon to show browser picker)"
              ref={timeStartRef}
              rightSection={
                <ActionIcon onClick={() => timeStartRef.current?.showPicker()}>
                  <IconClock size="1rem" stroke={1.5} />
                </ActionIcon>
              }
              maw={400}
              mx="auto"
            />
          )}
        />
        <Controller
          name="classEndTime"
          control={control}
          render={({ field: { ...field } }) => (
            <TimeInput
              {...field}
              label="Class start time (click icon to show browser picker)"
              ref={timeEndRef}
              rightSection={
                <ActionIcon onClick={() => timeEndRef.current?.showPicker()}>
                  <IconClock size="1rem" stroke={1.5} />
                </ActionIcon>
              }
              maw={400}
              mx="auto"
            />
          )}
        />
        <Button className="!bg-primary hover:!bg-primary-hover" type="submit">
          Create Class
        </Button>
      </form>
    </div>
  );
}
