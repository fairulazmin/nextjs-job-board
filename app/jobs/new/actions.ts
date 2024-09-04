"use server";

import { storeCompanyLogo, toSlug } from "@/lib/utils";
import { createJobSchema } from "@/lib/validation";
import db from "@/prisma/db";
import { redirect } from "next/navigation";

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

  await db.job.create({
    data: {
      slug,
      title: title.trim(),
      type,
      locationType,
      location,
      description: description?.trim(),
      salary: parseInt(salary),
      companyName: companyName.trim(),
      applicationEmail: applicationEmail?.trim(),
      applicationUrl: applicationUrl?.trim(),
      companyLogoUrl,
      approved: true, //remove in production
    },
  });

  redirect("/new/job-submitted");
};
