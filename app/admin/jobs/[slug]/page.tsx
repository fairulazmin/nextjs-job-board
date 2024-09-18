import { AdminSidebar } from "@/components/custom/adminSidebar";
import { JobPage } from "@/components/custom/jobPage";
import prisma from "@/prisma/db";
import { notFound } from "next/navigation";

interface PageProps {
  params: { slug: string };
}

const Page = async ({ params: { slug } }: PageProps) => {
  const job = await prisma.job.findUnique({
    where: { slug },
  });

  if (!job) notFound();

  return (
    <main className="flex m-auto my-10 max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobPage job={job} />
      <AdminSidebar job={job} />
    </main>
  );
};

export default Page;
