"use client";

import {
  useForm,
  FieldValues,
  UseFormReturn,
  SubmitHandler,
  FieldPath,
  Control,
  UseFormRegisterReturn,
} from "react-hook-form";
import React from "react";
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FormValues = {
  firstName: string;
  lastName: string;
  sex: string;
  company: string;
  location: string;
  country: string;
};

const defaultValues = {
  firstName: "Malik",
  lastName: "Razak",
  sex: "Male",
  company: "Boeing",
  location: "",
  country: "",
};

export default function App() {
  const onSubmit = (data: FormValues) => console.log(data);
  const form = useForm<FormValues>({
    defaultValues,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-2xl mx-auto my-10 space-y-3 p-2"
      >
        <FormInput form={form} name="firstName" label="First Name" />
        <FormInput2 form={form} name="lastName" label="Last Name" />
        <FormInput3 form={form} name="sex" label="Sex" />
        <FormInput4 form={form} name="company" label="Company" />
        <FormInput5 form={form} name="location" label="Location" />
        <FormInput6 form={form} name="country" label="Country" />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

type FormInputProps<T extends FieldValues, P extends FieldPath<T>> = {
  form: UseFormReturn<T>;
  name: P;
  label: string;
} & Omit<React.ComponentPropsWithoutRef<"input">, "form">;

// Based on Shadcn template
const FormInput = <T extends FieldValues, P extends FieldPath<T>>({
  form,
  name,
  label,
  ...props
}: FormInputProps<T, P>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const FormInput2 = <T extends FieldValues, P extends FieldPath<T>>({
  form,
  name,
  label,
  ...props
}: FormInputProps<T, P>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <div className="space-y-2">
          {/* Must add onClick={() => form.setFocus(name)} for setFocus to wor */}
          <Label onClick={() => form.setFocus(name)}>{label}</Label>
          <Input {...field} {...props} />
        </div>
      )}
    />
  );
};

const FormInput3 = <T extends FieldValues, P extends FieldPath<T>>({
  form,
  name,
  label,
  ...props
}: FormInputProps<T, P>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <div className="space-y-2">
          <label
            onClick={() => form.setFocus(name)}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
          <input
            {...field}
            {...props}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      )}
    />
  );
};

const FormInput4 = <T extends FieldValues, P extends FieldPath<T>>({
  form,
  name,
  label,
  ...props
}: FormInputProps<T, P>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="space-y-2">
            <label
              onClick={() => form.setFocus(name)}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </label>
            <CustomDiv {...field} {...props} />
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

type CustomInputProps = React.ComponentPropsWithoutRef<"input">;

const CustomDiv = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ ...props }, ref) => (
    <div className="flex flex-col w-full rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
      <CustomInput
        // Must add ref={ref} to wire up the ref
        ref={ref}
        {...props}
      />
    </div>
  ),
);

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);

const FormInput5 = <T extends FieldValues, P extends FieldPath<T>>({
  form,
  name,
  label,
  ...props
}: FormInputProps<T, P>) => {
  return (
    <div className="space-y-2">
      <label
        onClick={() => form.setFocus(name)}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
      <input
        {...form.register(name)}
        {...props}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
};

const FormInput6 = <T extends FieldValues, P extends FieldPath<T>>({
  form,
  name,
  label,
  ...props
}: FormInputProps<T, P>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="space-y-2">
            <label
              onClick={() => {
                form.setFocus(name);
                console.log(field);
              }}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </label>
            <CustomDiv2 {...field} {...props} />
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

const CustomDiv2 = React.forwardRef<HTMLDivElement, CustomInputProps>(
  ({ ...props }, ref) => (
    <div
      onClick={() => console.log(props.name, props.onChange)}
      ref={ref}
      className="flex flex-col w-full rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <CustomInput {...props} />
    </div>
  ),
);

/**
  ref:((elm) => {
      const field = get(control._fields, name);
      if (field && elm) {
          field._f.ref = {
              focus: () => elm.focus(),
              select: () => elm.select(),
              setCustomValidity: (message) => elm.setCustomValidity(message),
              reportValidity: () => elm.reportValidity(),
          };
      }
  }
**/
