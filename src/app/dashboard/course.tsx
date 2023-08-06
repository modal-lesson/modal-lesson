import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CoursesProps = {
  courses: {
    id: string;
    name: string;
    gradeLevel: string | null;
    numberOfStudents: number | null;
    day: string | null;
  }[];
};

export function Courses({ courses }: CoursesProps) {
  return (
    <div className="flex gap-5 flex-wrap my-10">
      {courses.map((course) => (
        <Card
          key={course.id}
          className="shadow-lg hover:scale-105 transition duration-500 cursor-pointer"
        >
          <CardHeader>
            <CardTitle>{course.name}</CardTitle>
            {/*TOOD: Add course description to schema */}
            <CardDescription>{course.gradeLevel}</CardDescription>
          </CardHeader>
          <CardContent>
            <p># of students: {course.numberOfStudents}</p>
            <p>Day: {course.day}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
