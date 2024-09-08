import db from "@/prisma/db";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { JobPage } from "@/components/custom/jobPage";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: { slug: string };
}

const getJob = cache(async (slug: string) => {
  const job = await db.job.findUnique({
    where: {
      slug,
    },
  });
  if (!job) notFound();

  return job;
});

export const generateStaticParams = async () => {
  const jobs = await db.job.findMany({
    where: { approved: true },
    select: { slug: true },
  });

  return jobs.map(({ slug }) => slug); //["slug-1", "slug-2"]
};

export const generateMetadata = async ({
  params: { slug },
}: PageProps): Promise<Metadata> => {
  const job = await getJob(slug);

  return {
    title: job.title,
  };
};

const Page = async ({ params: { slug } }: PageProps) => {
  const job = await getJob(slug);

  const { applicationEmail, applicationUrl } = job;

  const applicationLink = applicationEmail
    ? `mailto:${applicationEmail}`
    : applicationUrl;

  if (!applicationLink) {
    console.log("Job has no application link or email");
    notFound();
  }

  return (
    <main className="max-w-5xl px-3 m-auto my-10 flex flex-col md:flex-row items-center gap-5 md:items-start">
      <JobPage job={job} />
      <aside>
        <Button asChild>
          <a href={applicationLink} className="w-40 md:w-fit">
            Apply now
          </a>
        </Button>
      </aside>
    </main>
  );
};

export default Page;
