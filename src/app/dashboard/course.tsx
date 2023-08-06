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
    <>
      {courses.map((course) => (
        <Card key={course.id}>
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
    </>
  );
}
