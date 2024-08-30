"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { H1 } from "@/components/custom/h1";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form/form-input";
import { FormInput as FormInput2 } from "@/components/form/form-input2";
import { FormSearch } from "@/components/form/form-search";
import { FormSelect } from "@/components/form/form-select";
import { createJobSchema, CreateJobValues } from "@/lib/validation";
import { jobTypes, locationTypes } from "@/lib/job-types";
import citiesList from "@/lib/cities-list";
import { Label } from "@/components/ui/label";
import { FormEditor } from "@/components/form/form-editor";
import { Button } from "@/components/ui/button";

const defaultValues = {
  title: "",
  type: "",
  companyName: "",
  locationTypes: "",
  location: "",
  applicationEmail: "",
  applicationUrl: "",
  description: "",
  salary: "",
};

export const NewJobForm = () => {
  const form = useForm<CreateJobValues>({
    resolver: zodResolver(createJobSchema),
    defaultValues,
    // mode: "onChange",
  });

  // const {
  //   handleSubmit,
  //   watch,
  //   trigger,
  //   control,
  //   setValue,
  //   setFocus,
  //   formState: { isSubmitting },
  // } = form;

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
        <div>
          <h2 className="font-semibold">Job details</h2>
          <p className="text-muted-foreground">
            Provide a job description and details
          </p>
        </div>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
          >
            <FormInput
              control={form.control}
              name="title"
              label="Job title"
              placeholder="e.g. Frontend Developer"
            />
            <FormSelect
              control={form.control}
              name="type"
              label="Job Type"
              options={jobTypes}
            />
            <FormInput
              control={form.control}
              name="companyName"
              label="Company"
            />
            <FormInput
              control={form.control}
              name="companyLogo"
              label="Company Logo"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                form.setValue("companyLogo", file);
              }}
            />
            <FormSelect
              control={form.control}
              name="locationType"
              label="Location"
              options={locationTypes}
            />
            <FormSearch
              form={form}
              name="location"
              placeholder="Search for a city..."
              label="Office location"
              lists={citiesList}
              order={["name", "subcountry", "country"]}
            />
            <div className="space-y-2">
              <Label
                className={
                  (form.formState.errors.applicationEmail ||
                    form.formState.errors.applicationUrl) &&
                  "text-destructive"
                }
              >
                How to apply
              </Label>
              <div className="grid gap-2 md:grid-cols-2 items-start">
                <FormInput
                  control={form.control}
                  name="applicationEmail"
                  type="email"
                  label="none"
                  placeholder="Email"
                />
                <FormInput
                  control={form.control}
                  name="applicationUrl"
                  type="url"
                  label="none"
                  placeholder="Website"
                />
              </div>
            </div>
            <FormEditor
              control={form.control}
              name="description"
              label="Description"
            />
            <FormInput2
              form={form}
              name="salary"
              type="number"
              label="Salary"
              placeholder="10000"
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre>
      </div>
    </main>
  );
};

// "company" caused not able to submit & no ref
// "description" caused can't call setState & no ref
