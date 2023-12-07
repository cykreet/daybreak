"use client";

import CourseCard from "@/components/ui/course/course-card";
import CourseContainer from "@/components/ui/course/course-container";
import { getDate } from "@/components/ui/helpers/get-date";
import { progress } from "@/components/ui/helpers/progress";
import PageContainer from "@/components/ui/layout/page-container";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useQueryState } from "next-usequerystate";
import { Suspense, useEffect, useState } from "react";
import useSWR from "swr";
import { Course } from "../api/courses/route";
import { QOTD } from "../api/qotd/route";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Courses() {
  const [courseSlug, setCourseSlug] = useQueryState("course");
  const [sectionStorage, setSectionStorage] = useState<{ course: number; section: number; checked: boolean }[]>([]);
  const [qotdSubmission, setQOTDSubmission] = useState<{ id: number; date: Date; correct: boolean } | null>(null);
  const { data: qotdData } = useSWR<QOTD>("api/qotd", fetcher);
  const { data: courseData, error, isLoading } = useSWR<Course[]>("/api/courses", fetcher);

  useEffect(() => {
    const storage = localStorage.getItem("sectionStorage");
    const qotdSubmission = localStorage.getItem("qotdSubmission");
    if (storage) setSectionStorage(JSON.parse(storage));
    if (qotdSubmission) {
      const parsed = JSON.parse(qotdSubmission);
      const date = getDate(new Date(parsed.date));
      if (date !== getDate(new Date())) {
        localStorage.removeItem("qotdSubmission");
        setQOTDSubmission(null);
        return;
      }

      setQOTDSubmission(parsed);
    }
  }, [setSectionStorage, setQOTDSubmission]);

  if (courseSlug) {
    if (!courseData || isLoading) {
      return (
        <PageContainer>
          <div className="flex space-x-24 w-full">
            <Skeleton className="h-60 w-[150px]" />
            <div className="space-y-2 w-full">
              <Skeleton className="h-20 w-[60%]" />
              <Skeleton className="h-4 w-[30%]" />
              <br />
              <Skeleton className="h-80 w-[60%]" />
            </div>
          </div>
        </PageContainer>
      );
    }

    const course = courseData.find((course) => course.slug === courseSlug);
    if (!course) {
      return (
        <PageContainer>
          <p>Course not found.</p>
        </PageContainer>
      );
    }

    const handleSectionCheckedChange = (course: number, section: number, checked: CheckedState) => {
      const foundSection = sectionStorage.find((s) => s.course === course && s.section === section);
      const parsedChecked = checked === true ? true : false;
      if (!foundSection && parsedChecked) {
        const state = [...sectionStorage, { course, section, checked: parsedChecked }];
        setSectionStorage(state);
        localStorage.setItem("sectionStorage", JSON.stringify(state));
        return;
      }

      if (foundSection && !parsedChecked) {
        const state = sectionStorage.filter((s) => {
          if (s.course === course && s.section === section) return false;
          return true;
        });
        setSectionStorage(state);
        localStorage.setItem("sectionStorage", JSON.stringify(state));
        return;
      }
    };

    const handleQOTDSubmit = async (id: number) => {
      const response = await fetch(`/api/qotd?submission=${id}`);
      const data = (await response.json()) as { correct: boolean };
      const state = { id, date: new Date(), correct: data.correct };
      setQOTDSubmission(state);
      localStorage.setItem("qotdSubmission", JSON.stringify(state));
    };

    return (
      <Suspense>
        <PageContainer>
          {/* <Confetti width={window.innerWidth - 100} height={window.innerHeight} /> */}
          <CourseContainer
            course={course}
            qotd={qotdData}
            qotdSubmission={qotdSubmission}
            sectionStorage={sectionStorage}
            onSectionCheckedChange={handleSectionCheckedChange}
            onQOTDSubmit={handleQOTDSubmit}
          />
        </PageContainer>
      </Suspense>
    );
  }

  return (
    <PageContainer>
      <div className="text-center justify-center">
        <h1 className="mt-10">Courses</h1>
        <p>Choose one of our courses to get started.</p>
      </div>
      <div className="flex flex-col md:flex-row md:flex-wrap gap-10 mt-10">
        {courseData?.map((course) => {
          return (
            <CourseCard
              key={course.slug}
              course={course}
              progress={progress(
                course.sections.length,
                sectionStorage.filter((section) => section.course === course.id).length
              )}
              onClick={() => setCourseSlug(course.slug)}
            />
          );
        })}
      </div>
    </PageContainer>
  );
}
