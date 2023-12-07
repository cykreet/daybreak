import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import PageContainer from "@/components/ui/layout/page-container";

export default function About() {
  return (
    <PageContainer>
      <div className="text-center justify-center">
        <h1 className="mt-10">About</h1>
        <p>The daybreak team is a group of students from the [REDACTED].</p>
      </div>
      <div className="flex flex-col md:flex-row md:flex-wrap gap-10 mt-28 justify-center">
        <Card className="w-80">
          <CardHeader>
            <CardTitle className="text-center">[REDACTED]</CardTitle>
          </CardHeader>
        </Card>
        <Card className="w-80">
          <CardHeader>
            <CardTitle className="text-center">[REDACTED]</CardTitle>
          </CardHeader>
        </Card>
        <Card className="w-80">
          <CardHeader>
            <CardTitle className="text-center">[REDACTED]</CardTitle>
          </CardHeader>
        </Card>
        <Card className="w-80">
          <CardHeader>
            <CardTitle className="text-center">[REDACTED]</CardTitle>
          </CardHeader>
        </Card>
        <Card className="w-80">
          <CardHeader>
            <CardTitle className="text-center">[REDACTED]</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </PageContainer>
  );
}
