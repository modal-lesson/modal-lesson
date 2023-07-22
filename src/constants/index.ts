import type { Day } from "@prisma/client";

type DayType = {
  value: Day;
  label: Day;
}[];

export type GradeType = typeof GRADE_OPTIONS;

export const GRADE_OPTIONS = [
  { value: "Kindergarten", label: "Kindergarten" },
  { value: "First Grade", label: "First Grade" },
  { value: "Second Grade", label: "Second Grade" },
  { value: "Third Grade", label: "Third Grade" },
  { value: "Fourth Grade", label: "Fourth Grade" },
  { value: "Fifth Grade", label: "Fifth Grade" },
  { value: "Sixth Grade", label: "Sixth Grade" },
  { value: "Seventh Grade", label: "Seventh Grade" },
  { value: "Eighth Grade", label: "Eighth Grade" },
  { value: "Ninth Grade", label: "Ninth Grade" },
  { value: "Tenth Grade", label: "Tenth Grade" },
  { value: "Eleventh Grade", label: "Eleventh Grade" },
  { value: "Twelfth Grade", label: "Twelfth Grade" },
  { value: "9th-12th Grade", label: "9th-12th Grade" },
  { value: "6th-8th Grade", label: "6th-8th Grade" },
  { value: "Other", label: "Other" },
];

export const DAY_OPTIONS: DayType = [
  {
    value: "A",
    label: "A",
  },
  {
    value: "B",
    label: "B",
  },
];

export const NONAUTHENTICATED_ROUTES = ["/login"];
export const AUTHENTICATED_ROUTES = [
  "/home",
  "/plans",
  "/settings",
  "/profile",
  "/create",
  "/create/lesson",
  "/create/course",
  "/course/[id]",
  "/create/lesson/[id]/new",
  "/lesson/[id]",
];
