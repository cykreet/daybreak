import Link from "next/link";
import { Course } from "@/app/api/courses/route";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import CourseProgress from "./course-progress";

export default function CourseCard({
  course,
  progress,
  onClick,
}: {
  course: Course;
  progress: number;
  onClick: () => void;
}) {
  return (
    <Card
      className="cursor-pointer dark:hover:bg-slate-400 dark:hover:bg-opacity-10 dark:transition dark:duration-400 ease-in-out hover:bg-slate-400 hover:bg-opacity-10 transition duration-400 dark:ease-in-out md:w-72"
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle>
          <CourseProgress progress={progress} />
          {course.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{course.summary ?? "No summary provided."}</p>
      </CardContent>
    </Card>
  );
}
