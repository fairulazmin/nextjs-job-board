import db from "@/prisma/db";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { JobPage } from "@/components/custom/jobPage";

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

  return (
    <main className="max-w-5xl px-3 m-auto my-10 flex flex-col md:flex-row items-center gap-5 md:items-start">
      <JobPage job={job} />
    </main>
  );
};

export default Page;
