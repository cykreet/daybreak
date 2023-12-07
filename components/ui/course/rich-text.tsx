/* eslint-disable react/jsx-key */
import clsx from "clsx";
import React, { Fragment, ReactElement } from "react";
import Link from "next/link";
import { StrapiRichText } from "@/app/api/courses/route";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "../card";

function Header(children: ReactElement, level: number) {
  const heading = React.createElement(`h${level}`, {}, children);
  return heading;
}

export default function RichText({
  children,
  className,
}: {
  children: StrapiRichText | StrapiRichText[];
  className?: string;
}) {
  const contentChildren = Array.isArray(children) ? children : [children];
  return (
    <div className={className}>
      {contentChildren.map((item) => {
        if (item.type === "paragraph" && item.children) {
          return (
            <p>
              <RichText>{item.children}</RichText>
            </p>
          );
        }

        if (item.type === "text") {
          if (item.text === "") return null;
          const styleClassName = clsx(
            className,
            item.bold && "font-bold",
            item.italic && "italic",
            item.underline && "underline",
            item.strikethrough && "line-through"
          );
          return <span className={styleClassName}>{item.text}</span>;
        }

        if (item.type === "heading" && item.children) {
          const level = item.level ?? 1;
          const children = <RichText>{item.children}</RichText>;
          return Header(children, level);
        }

        if (item.type === "list" && item.children) {
          const items = item.children.map((child, index) => {
            if (!child.children) return null;
            return (
              <li>
                <RichText>{child.children}</RichText>
              </li>
            );
          });

          if (item.format === "unordered") {
            return <ul className="list-disc list-outside pl-10">{items}</ul>;
          }

          if (item.format === "ordered") {
            return <ol className="list-decimal list-outside pl-10">{items}</ol>;
          }
        }

        if (item.type === "link" && item.children) {
          return (
            <Link href={item.url ?? "/"} className="text-blue-600">
              <RichText>{item.children}</RichText>
            </Link>
          );
        }

        if (item.type === "image" && item.image) {
          return (
            <div className="flex justify-center">
              <Card className="w-fit">
                <CardHeader>
                  <Image
                    className="rounded-md"
                    width={item.image.width}
                    height={item.image.height}
                    src={item.image.url}
                    alt={item.image.alternativeText}
                  />
                </CardHeader>
                {item.image.caption && <CardContent className="text-center text-sm">{item.image.caption}</CardContent>}
              </Card>
            </div>
          );
        }
      })}
    </div>
  );
}
