"use client";

import { Course } from "@/app/api/courses/route";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/layout/navigation-menu";
import { useHydration } from "@/lib/useHydration";
import { cn } from "@/lib/utils";
import { Coffee, Monitor, Wine } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../dropdown-menu";

export default function Header({ courses }: { courses: Course[] | undefined }) {
  const hydrated = useHydration();
  const { theme, systemTheme, setTheme } = useTheme();
  const displayTheme = theme === "system" ? systemTheme : theme;
  return (
    <React.Suspense key={hydrated ? "load" : "hydr"}>
      <header className="container flex justify-between mt-6 mb-28">
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer" asChild>
              {(displayTheme === "dark" && <Wine className="inline-block mr-2" />) || (
                <Coffee className="inline-block mr-2" />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Coffee className="inline-block w-4 h-4 mr-2" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Wine className="inline-block w-4 h-4 mr-2" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Monitor className="inline-block w-4 h-4 mr-2" />
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/" className="my-auto font-bold hidden md:inline">
            daybreak
          </Link>
        </div>
        <div className="flex space-x-10">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/courses" legacyBehavior passHref>
                  <NavigationMenuLink>
                    <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
                    {courses !== undefined && (
                      <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.5fr_.5fr]">
                          {courses.map((course) => {
                            return (
                              <ListItem key={course.slug} href={`/courses?course=${course.slug}`} title={course.name}>
                                {course.summary ?? "No summary provided."}
                              </ListItem>
                            );
                          })}
                        </ul>
                      </NavigationMenuContent>
                    )}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/pricing" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Pricing</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>About</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Avatar className="border-4 cursor-pointer border-black-600">
            <AvatarImage src="https://i.insider.com/60f7072bb917280012752082?width=700" />
            <AvatarFallback>J</AvatarFallback>
          </Avatar>
        </div>
      </header>
    </React.Suspense>
  );
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);

ListItem.displayName = "ListItem";
