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
import { getServerSideProps } from "~/server/serverProps";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type CourseSchemaValidator,
  createCourseValidator,
} from "~/lib/validator";

export default function Page() {
  // Ref is here to use Browser input vs the render from the controller.
  const timeStartRef = useRef() as MutableRefObject<HTMLInputElement>;
  const timeEndRef = useRef() as MutableRefObject<HTMLInputElement>;
  const router = useRouter();

  const courseMutation = api.course.create.useMutation({
    onSuccess: async () => {
      notifications.show({
        title: "Success",
        message: "Course created successfully",
        color: "green",
      });

      await router.push("/home");
    },
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CourseSchemaValidator>({
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    resolver: zodResolver(createCourseValidator),
  });

  const onSubmit = (data: CourseSchemaValidator) => {
    courseMutation.mutate({
      ...data,
      numberOfStudents: data.numberOfStudents,
    });
    reset();
  };

  return (
    <div>
      <h1>Create your course</h1>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          {...register("name", { required: true })}
          placeholder="Course Name"
          label="Course name"
          required
          error={errors.name?.message}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        <Controller
          name="gradeLevel"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              onChange={onChange as unknown as (value: string) => void}
              value={value}
              label="Grade Level"
              placeholder="Pick one"
              data={GRADE_OPTIONS}
              required
            />
          )}
        />
        <TextInput
          {...register("numberOfStudents", { valueAsNumber: true })}
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
              onChange={onChange as unknown as (value: Date) => void}
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
              onChange={onChange as unknown as (value: Date) => void}
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
          render={({ field: { onChange, value } }) => (
            <Select
              onChange={onChange as unknown as (value: string) => void}
              value={value}
              label="A or B day"
              placeholder="Pick one"
              data={DAY_OPTIONS}
            />
          )}
        />
        <Button
          loading={courseMutation.isLoading}
          className="!bg-primary hover:!bg-primary-hover mt-5"
          type="submit"
        >
          {courseMutation.isLoading ? "Creating..." : "Create Class"}
        </Button>
      </form>
    </div>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export { getServerSideProps };
