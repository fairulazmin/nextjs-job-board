"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { H1 } from "@/components/custom/h1";
import { FormInput, FormInputWithRef } from "@/components/form/form-input";
// import { FormInputWithRef } from "@/components/form/form-input-with-ref";
import { createJobSchema, CreateJobValues } from "@/lib/validation";
import { FormSelect } from "@/components/form/form-select";
import { jobTypes, locationTypes } from "@/lib/job-types";

export const NewJobForm = () => {
  const form = useForm<CreateJobValues>({
    resolver: zodResolver(createJobSchema),
  });

  const {
    handleSubmit,
    watch,
    trigger,
    control,
    setValue,
    setFocus,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: CreateJobValues) => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <main className="max-w-3xl m-auto my-10 space-y-10">
      <div className="space-y-5 text-center">
        <H1>Find your perfect developer</H1>
        <p className="text-muted-foreground">
          Get your job posting seen by thousands of job seekers.
        </p>
      </div>
      <div className="space-y-6 border rounded-lg p-4">
        <h2 className="font-semibold">Job details</h2>
        <p className="text-muted-foreground">
          Provide a job description and details
        </p>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <FormInput
              control={control}
              name="title"
              label="Job title"
              placeholder="e.g. Frontend Developer"
            />
            <FormSelect
              control={control}
              name="type"
              label="Job Type"
              options={jobTypes}
            />
            <FormInput control={control} name="companyName" label="Company" />
            <FormInput
              control={control}
              name="companyLogo"
              label="Company Logo"
              type="file"
              accept="image/*"
              // onChange={e => {
              //   const file = e.target.files?.[0]
              //   form.setValue("companyLogo", file)
              // }}
            />
            <FormSelect
              control={control}
              name="locationType"
              label="Location"
              options={locationTypes}
            />
            <FormInputWithRef
              control={control}
              name="location"
              label="Office location"
            />
          </form>
        </Form>
        <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre>
      </div>
    </main>
  );
};
