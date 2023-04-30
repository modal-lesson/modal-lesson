import type { Day } from "@prisma/client";

type DayType = {
  value: Day;
  label: Day;
}[];

export const GRADE_OPTIONS = [
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
