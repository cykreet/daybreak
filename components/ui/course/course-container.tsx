"use client";

import { Course, CourseSection } from "@/app/api/courses/route";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useState } from "react";
import PageContainer from "../layout/page-container";
import CourseSidebar from "./course-sidebar";
import RichText from "./rich-text";
import { QOTD } from "@/app/api/qotd/route";

export default function CourseContainer({
  course,
  qotd,
  qotdSubmission,
  sectionStorage,
  onSectionCheckedChange,
  onQOTDSubmit,
}: {
  course: Course;
  qotd?: QOTD;
  qotdSubmission: { id: number; date: Date; correct: boolean } | null;
  sectionStorage: { course: number; section: number; checked: CheckedState }[];
  onSectionCheckedChange: (course: number, section: number, checked: CheckedState) => void;
  onQOTDSubmit: (id: number) => void;
}) {
  const [selectedSection, setSelectedSection] = useState(course.sections[0].id);
  const section = course.sections.find(
    (section) => section.id === selectedSection ?? course.sections[0].id
  ) as CourseSection;
  return (
    <PageContainer>
      <div className="flex flex-col md:flex-row space-y-24 md:space-x-24 md:space-y-0">
        <CourseSidebar
          course={course}
          qotd={qotd}
          qotdSubmission={qotdSubmission}
          activeSection={selectedSection}
          sectionStorage={sectionStorage}
          onSectionChange={(id) => setSelectedSection(id)}
          onSectionCheckedChange={onSectionCheckedChange}
          onQOTDSubmit={onQOTDSubmit}
        />
        <div className="max-w-4xl w-full space-y-4">
          <h1>{section.name}</h1>
          <RichText className="space-y-4">{section.content}</RichText>
        </div>
      </div>
    </PageContainer>
  );
}
