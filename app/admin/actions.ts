"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type FormState = { error?: string } | undefined;

export const approveSubmission = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  try {
    const jobId = parseInt(formData.get("jobId") as string);

    // TODO: Get user and check if user is admin
    /*
    const user = await currentUser()
    if (!user || !isAdmin(user) {
      throw new Error ("Not authorized")
    })
    */

    // TODO: If check is passed, approve job in the database
    /*
    await prisma.job.update({
      where: {
      id: jobId
      },
      data: {
        approved: true
      }
    })
    */
  } catch (error) {
    let message = "Unexpected error";

    if (error instanceof Error) message = error.message;
    return { error: message };
  }

  revalidatePath("/");
};

export const deleteJob = async (prevState: FormState, formData: FormData) => {
  try {
    const jobId = parseInt(formData.get("jobId") as string);

    // TODO: Get user and check if user is admin
    /*
  if (!user || !isAdmin(user)){
    throw new Error ("Not authorized")
  }
  */

    // TODO: If check is passed, delete job in the database
    /*
  const job = await prisma.job.findUnique({
    where: {id: jobId}
  })

  if (job?.companyLogoUrl){
    await del(job.companyLogoUrl)
  }

  await prisma.job.delete({
    where: {id: jobId}
  })
  */

    revalidatePath("/");
  } catch (error) {
    let message = "Unexpected error";

    if (error instanceof Error) message = error.message;
    return { error: message };
  }

  redirect("/admin");
};
