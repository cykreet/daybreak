import { Github } from "lucide-react";
import Link from "next/link";

export default function Footer({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto">
      <main className="min-h-screen">{children}</main>
      <footer className="border-box-border text-grey-400 flex min-w-full flex-col items-center border-t text-sm">
        <div className="p-4 container">
          <p className="text-gray-400">
            <Link className="hover:text-white" href="https://github.com/cykreet/daybreak">
              <Github className="inline-block mr-4 w-5" />
            </Link>
            made with ❤️ by the daybreak team
          </p>
        </div>
      </footer>
    </div>
  );
}
