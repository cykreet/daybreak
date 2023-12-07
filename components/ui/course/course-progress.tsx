import clsx from "clsx";
import { Badge } from "../badge";

export default function CourseProgress({ progress }: { progress: number }) {
  const badgeClassName = clsx(
    "mr-2 font-bold",
    progress === 100 && "text-green-600 bg-green-200 hover:bg-green-300 dark:bg-green-900 dark:bg-opacity-10"
  );
  return <Badge className={badgeClassName}>{progress}%</Badge>;
}
