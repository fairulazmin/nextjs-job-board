import { H1 } from "@/components/custom/h1";
import { JobFilterSidebar } from "@/components/custom/jobFilterSidebar";
import { JobResults } from "@/components/custom/jobResults";
import { JobFilterValues } from "@/lib/validation";
import { Metadata } from "next";

interface PageProps {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
  };
}

const getTitle = ({ q, type, location, remote }: JobFilterValues) => {
  const titlePrefix = q
    ? `${q} jobs`
    : type
    ? `${type} developer jobs`
    : remote
    ? "Remote developer jobs"
    : "All developer jobs";

  const titleSuffix = location ? `in ${location}` : "";

  return `${titlePrefix} ${titleSuffix}`;
};

// Function Name has to be exactly the same
export const generateMetadata = ({
  searchParams: { q, type, location, remote },
}: PageProps): Metadata => {
  return {
    title: `${getTitle({
      q,
      type,
      location,
      remote: remote === "true",
    })} | Flow Jobs`,
  };
};

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
        <H1>{getTitle(filterValues)}</H1>
        <p className="text-muted-foreground">Find your dream job</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <JobFilterSidebar defaultValues={filterValues} />
        <JobResults filterValues={filterValues} />
      </section>
    </main>
  );
}
