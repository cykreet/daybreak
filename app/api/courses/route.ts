import { NextRequest } from "next/server";
import { STRAPI_HOST, STRAPI_TOKEN } from "../../constants";

interface StrapiCoursesResponse {
  data: {
    id: number;
    attributes: {
      Title: string;
      Slug: string;
      Summary?: string;
      Sections: {
        id: number;
        Title: string;
        Content: StrapiRichText[];
      }[];
    };
  }[];
}

export interface Course {
  id: number;
  slug: string;
  name: string;
  summary?: string;
  sections: CourseSection[];
}

export interface CourseSection {
  id: number;
  name: string;
  content: StrapiRichText[];
}

export interface StrapiRichText {
  __component?: string;
  type: "text" | "paragraph" | "text" | "link" | "heading" | "list" | "list-item" | "image";
  text?: string;
  format?: "unordered" | "ordered";
  level?: number;
  bold?: boolean;
  underline?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  url?: string;
  children?: StrapiRichText[];
  image?: {
    url: string;
    alternativeText: string;
    name: string;
    size: number;
    width: number;
    height: number;
    caption: string | null;
    formats: {
      thumbnail: {
        name: string;
        url: string;
        size: number;
        width: number;
        height: number;
      };
    };
  };
}

export async function GET(request: NextRequest) {
  const response = await fetch(`${STRAPI_HOST}/api/courses?populate=*`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    next: { revalidate: 3600 },
  });
  const courses = (await response.json()) as StrapiCoursesResponse;
  const structured = courses.data
    .map((course) => ({
      id: course.id,
      slug: course.attributes.Slug,
      name: course.attributes.Title,
      summary: course.attributes.Summary,
      sections: course.attributes.Sections.map((section) => ({
        id: section.id,
        name: section.Title,
        content: section.Content,
      })),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return Response.json(structured);
}
