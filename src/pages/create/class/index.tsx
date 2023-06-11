import { ActionIcon, Button, TextInput } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { Select } from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";
import { type MutableRefObject, useRef } from "react";
import { GRADE_OPTIONS, DAY_OPTIONS } from "~/constants";
import { api } from "~/utils/api";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import { MainLayout } from "~/layout/MainLayout";

type ClassFormValues = {
  name: string;
  gradeLevel: string;
  numberOfStudents: number;
  classStartDate: Date;
  classEndDate: Date;
  startTime: string;
  endTime: string;
  day: "A" | "B";
};

export default function Page() {
  // Ref is here to use Browser input vs the render from the controller.
  const timeStartRef = useRef() as MutableRefObject<HTMLInputElement>;
  const timeEndRef = useRef() as MutableRefObject<HTMLInputElement>;
  const router = useRouter();

  const classMutation = api.class.create.useMutation({
    onSuccess: async () => {
      notifications.show({
        title: "Success",
        message: "Class created successfully",
        color: "green",
      });

      await router.push("/home");
    },
  });

  const { register, control, handleSubmit, reset } = useForm<ClassFormValues>({
    defaultValues: {
      name: "",
      gradeLevel: "",
      numberOfStudents: undefined,
      classStartDate: undefined,
      classEndDate: undefined,
      startTime: "",
      endTime: "",
      day: "A",
    },
  });

  const onSubmit = (data: ClassFormValues) => {
    classMutation.mutate({
      ...data,
      numberOfStudents: Number(data.numberOfStudents),
    });
    reset();
  };

  return (
    <div>
      <h1>Create your class</h1>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          {...register("name")}
          placeholder="Class Name"
          label="Class name"
          required
        />
        <Controller
          name="gradeLevel"
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
            />
          )}
        />
        <Controller
          name="startTime"
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
            />
          )}
        />
        <Controller
          name="endTime"
          control={control}
          render={({ field: { ...field } }) => (
            <TimeInput
              {...field}
              label="Class end time (click icon to show browser picker)"
              ref={timeEndRef}
              rightSection={
                <ActionIcon onClick={() => timeEndRef.current?.showPicker()}>
                  <IconClock size="1rem" stroke={1.5} />
                </ActionIcon>
              }
            />
          )}
        />
        <Controller
          name="day"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label="A or B day"
              placeholder="Pick one"
              data={DAY_OPTIONS}
            />
          )}
        />
        <Button
          loading={classMutation.isLoading}
          className="!bg-primary hover:!bg-primary-hover mt-5"
          type="submit"
        >
          {classMutation.isLoading ? "Creating..." : "Create Class"}
        </Button>
      </form>
    </div>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
