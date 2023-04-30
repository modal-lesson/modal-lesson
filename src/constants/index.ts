import type { Day } from "@prisma/client";

type DayType = {
  value: Day;
  label: Day;
}[];

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
