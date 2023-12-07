import PageContainer from "@/components/ui/layout/page-container";
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "../../components/ui/button";
import Link from "next/link";

export default function Pricing() {
  return (
    <PageContainer>
      <div className="text-center justify-center">
        <h1 className="mt-10">Pricing</h1>
        <p>Choose between a monthly subscription or a one-time payment for lifetime access to an individual course.</p>
      </div>
      <div className="flex flex-col md:flex-row md:flex-wrap gap-10 mt-28 justify-center">
        <Card className="w-80">
          <CardHeader>
            <CardTitle>$29/month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-pink-500" />
              <span className="text-sm font-medium leading-none">Unlimited access to courses.</span>
            </div>
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-pink-500" />
              <span className="text-sm font-medium leading-none">30-day moneyback guarantee.</span>
            </div>
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-pink-500" />
              <span className="text-sm font-medium leading-none">Cancel anytime. No questions asked.</span>
            </div>
          </CardContent>
          <CardFooter>
            <Link className="w-full" href={"https://www.youtube.com/watch?v=D7_EU4i0ESs"}>
              <Button className="w-full">Subscribe</Button>
            </Link>
          </CardFooter>
        </Card>
        <Card className="w-80">
          <CardHeader>
            <CardTitle>$399/lifetime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-pink-500" />
              <span className="text-sm font-medium leading-none">Unlimited access to courses for life.</span>
            </div>
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-pink-500" />
              <span className="text-sm font-medium leading-none">30-day moneyback guarantee.</span>
            </div>
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-pink-500" />
              <span className="text-sm font-medium leading-none">Access to all future courses.</span>
            </div>
          </CardContent>
          <CardFooter>
            <Link className="w-full" href={"https://www.youtube.com/watch?v=D7_EU4i0ESs"}>
              <Button className="w-full">Purchase</Button>
            </Link>
          </CardFooter>
        </Card>
        <Card className="w-80">
          <CardHeader>
            <CardTitle>Individual Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-pink-500" />
              <span className="text-sm font-medium leading-none">
                Purchase individual courses for $29.99 each. Lifetime access included.
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
