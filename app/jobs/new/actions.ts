"use server";

import { redirect } from "next/navigation";
import TurndownService from "turndown";
import { storeCompanyLogo, toSlug } from "@/lib/utils";
import { createJobSchema } from "@/lib/validation";
import db from "@/prisma/db";

export const createJobPosting = async (formData: FormData) => {
  const values = Object.fromEntries(formData.entries());

  const result = createJobSchema.safeParse(values);
  if (!result.success) return result.error.formErrors.fieldErrors;

  const {
    title,
    type,
    companyName,
    companyLogo,
    locationType,
    location,
    applicationEmail,
    applicationUrl,
    description,
    salary,
  } = result.data;

  const slug = toSlug(title);

  const companyLogoUrl = companyLogo
    ? await storeCompanyLogo(companyLogo, companyName)
    : undefined;

  const turndownService = new TurndownService();
  const description_md =
    description && turndownService.turndown(description.trim());

  await db.job.create({
    data: {
      slug,
      title: title.trim(),
      type,
      locationType,
      location,
      description: description_md,
      salary: parseInt(salary),
      companyName: companyName.trim(),
      applicationEmail: applicationEmail?.trim(),
      applicationUrl: applicationUrl?.trim(),
      companyLogoUrl,
      // approved: true, //remove in production
    },
  });

  redirect("/new/job-submitted");
};
