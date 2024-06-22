import { JobListItem } from "./jobListItem";
import db from "@/prisma/db";
import { JobFilterValues } from "@/lib/validation";
import { Prisma } from "@prisma/client";

interface JobResultsProps {
  filterValues: JobFilterValues;
}

export const JobResults = async ({
  filterValues: { q, type, location, remote },
}: JobResultsProps) => {
  const searchQuery = q?.trim().split(/ +/);

  const searchFields = [
    "title",
    "companyName",
    "type",
    "locationType",
    "location",
  ];

  let filter = [];
  if (searchQuery) {
    for (const x of searchFields) {
      for (const y of searchQuery) {
        filter.push({ [x]: { contains: y } });
      }
    }
  }

  const searchFilter: Prisma.JobWhereInput = { OR: filter } || {};

  //https://www.prisma.io/docs/orm/prisma-client/queries/full-text-search
  // IF DATABASE FULL-TEXT SEARCH IS ENABLE (EXP: MYSQL OR POSTGRES)
  // searchQuery?.join(" & ") //FOR POSTGRES
  // searchQuery?.join(" ") //FOR MYSQL
  // const searchFilter: Prisma.JobWhereInput = searchString
  //   ? {
  //       OR: [
  //         { title: { search: searchString } },
  //         { companyName: { search: searchString } },
  //         { type: { search: searchString } },
  //         { locationType: { search: searchString } },
  //         { location: { search: searchString } },
  //       ],
  //     }
  //   : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "Remote" } : {},
      { approved: true },
    ],
  };

  const jobs = await db.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobListItem job={job} key={job.id} />
      ))}
    </div>
  );
};
