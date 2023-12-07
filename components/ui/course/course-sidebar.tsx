import { Course } from "@/app/api/courses/route";
import { QOTD } from "@/app/api/qotd/route";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckedState } from "@radix-ui/react-checkbox";
import clsx from "clsx";
import { ArrowLeft, Star } from "lucide-react";
import Link from "next/link";
import { Fragment, useState } from "react";
import { Button } from "../button";
import { Card, CardContent, CardHeader } from "../card";
import { Checkbox } from "../checkbox";
import { progress } from "../helpers/progress";
import { Label } from "../label";
import { RadioGroup, RadioGroupItem } from "../radio-group";
import { Separator } from "../separator";
import CourseProgress from "./course-progress";

export default function CourseSidebar({
  course,
  qotd,
  qotdSubmission,
  activeSection,
  sectionStorage,
  onSectionChange,
  onSectionCheckedChange,
  onQOTDSubmit,
}: {
  course: Course;
  qotd?: QOTD;
  activeSection: number;
  qotdSubmission: { id: number; date: Date; correct: boolean } | null;
  sectionStorage: { course: number; section: number; checked: CheckedState }[];
  onSectionChange: (id: number) => void;
  onSectionCheckedChange: (course: number, section: number, checked: CheckedState) => void;
  onQOTDSubmit: (id: number) => void;
}) {
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const courseProgress = progress(
    course.sections.length,
    sectionStorage.filter((section) => section.course === course.id).length
  );

  const submissionCardClassName = clsx(
    qotdSubmission?.correct === false && "text-red-500 bg-red-100 border-red-500 dark:bg-red-900 dark:bg-opacity-10",
    qotdSubmission?.correct === true &&
      "text-green-500 bg-green-100 border-green-500 dark:bg-green-900 dark:bg-opacity-10"
  );
  const submitClassName = clsx(
    "mt-6 w-full",
    (qotdSubmission?.correct === false && "text-red-900 font-semibold bg-red-200 hover:bg-red-600") ||
      (qotdSubmission?.correct === true && "text-green-900 font-semibold bg-green-200 hover:bg-green-600")
  );
  return (
    <div className="md:sticky top-10 overflow-y-scroll no-scrollbar h-max max-w-sm">
      <div className="mb-4 opacity-60">
        <Link href="/courses" className="text-sm">
          <ArrowLeft className="inline-block mr-2 h-4 w-4" />
          Back to courses
        </Link>
      </div>
      <p className="mb-4 font-semibold">
        <CourseProgress progress={courseProgress} />
        {course.name}
      </p>
      <ScrollArea className="max-h-[36rem]">
        <div className="flex flex-col gap-3">
          {course.sections.map((section) => (
            <span key={section.id} className="flex text-sm cursor-pointer">
              <Checkbox
                checked={
                  sectionStorage.find((s) => s.course === course.id && s.section === section.id)?.checked ?? false
                }
                onCheckedChange={(checked) => onSectionCheckedChange(course.id, section.id, checked)}
                className="mt-0.5 mr-3 rounded-full"
              />
              <a
                className={activeSection === section.id ? "font-bold" : undefined}
                onClick={() => onSectionChange(section.id)}
              >
                {section.name}
              </a>
            </span>
          ))}
        </div>
      </ScrollArea>
      <Separator className="my-6" />
      <Card className=" bg-black bg-opacity-[0.03]">
        <CardHeader>
          <h4 className="flex font-semibold">
            <Star className="my-auto mr-2 h-5 w-5" />
            Question of the day
          </h4>
          <p>Test your knowledge of course material by answering our question of the day.</p>
        </CardHeader>
        <CardContent>
          <Card className={submissionCardClassName}>
            {(qotd && (
              <Fragment>
                <CardHeader className="pb-2">
                  {qotdSubmission && <p className="text-xs opacity-70">you can play again tomorrow :)</p>}
                  <h5 className="font-semibold">Q: {qotd.question}</h5>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={qotdSubmission?.id ? String(qotdSubmission.id) : undefined}
                    onValueChange={(value) => setSelectedOption(Number(value))}
                  >
                    {qotd.options.map((option) => {
                      const stringId = String(option.id);
                      return (
                        <div key={option.id} className="flex items-center space-x-2">
                          <RadioGroupItem value={stringId} id={stringId} />
                          <Label htmlFor={stringId}>{option.value}</Label>
                        </div>
                      );
                    })}
                  </RadioGroup>
                  <Button
                    className={submitClassName}
                    disabled={qotdSubmission != null}
                    onClick={() => onQOTDSubmit(selectedOption)}
                  >
                    {qotdSubmission
                      ? qotdSubmission.correct
                        ? "Correct, well done!"
                        : "You got this one wrong."
                      : "Submit"}
                  </Button>
                </CardContent>
              </Fragment>
            )) || (
              <CardHeader>
                <p className="text-sm">No question of the day available.</p>
              </CardHeader>
            )}
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
