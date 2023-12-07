"use client";

import Header from "./header";
import Footer from "./footer";
import useSWR from "swr";
import { Course } from "@/app/api/courses/route";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data, error, isLoading } = useSWR<Course[]>(
    "/api/courses",
    (url: string) => fetch(url).then((res) => res.json())
  );
  return (
    <Footer>
      <Header courses={data} />
      {children}
    </Footer>
  );
}
