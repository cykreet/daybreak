"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageContainer from "@/components/ui/layout/page-container";
import Link from "next/link";

export default function Home() {
  return (
    <PageContainer>
      <h1 className="text-6xl">Learning at your own pace.</h1>
      <h2 className="font-medium flex flex-row gap-4">
        <span className="relative flex h-3 w-3 my-auto">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
        </span>
        <span>
          daybreak puts the curriculum back in <span className="text-pink-400">your hands</span>.
        </span>
      </h2>
      <div className="flex flex-col md:flex-row md:flex-wrap gap-10 mt-56 justify-center">
        <Card className="w-80">
          <CardHeader>
            <CardTitle>Course Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-pink-500" />
              <span className="text-sm font-medium leading-none">Our courses cover the fundamentals.</span>
            </div>
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-pink-500" />
              <span className="text-sm font-medium leading-none">You learn at your own pace, on your own time.</span>
            </div>
          </CardContent>
        </Card>
        <Card className="w-80">
          <CardHeader>
            <CardTitle>Fair Pricing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-pink-500" />
              <span className="text-sm font-medium leading-none">
                Choose between a monthly subscription or a one-time payment for lifetime access to an individual course.
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="w-80">
          <CardHeader>
            <CardTitle>Fun Challenges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-pink-500" />
              <span className="text-sm font-medium leading-none">
                Participate in daily questions to challenge your knowledge with other students.
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex mx-auto">
        <Link className="mx-auto mt-10" href={"/courses"}>
          <Button className="font-bold" variant={"default"}>
            View Courses
          </Button>
        </Link>
      </div>
    </PageContainer>
  );
}
