import { H1 } from "@/components/custom/h1";
import { JobFilterSidebar } from "@/components/custom/jobFilterSidebar";
import { JobResult } from "@/components/custom/jobResults";
import { JobFilterValues } from "@/lib/validation";

interface PageProps {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
  };
}

export default async function Home({
  searchParams: { q, type, location, remote },
}: PageProps) {
  const filterValues: JobFilterValues = {
    q,
    type,
    location,
    remote: remote === "true",
  };

  return (
    <main className="max-w-5xl m-auto px-3 my-10 space-y-10">
      <div className="space-y-5 text-center">
        <H1>Developer jobs</H1>
        <p className="text-muted-foreground">Find your dream job</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <JobFilterSidebar />
        <JobResult filterValues={filterValues} />
      </section>
    </main>
  );
}
