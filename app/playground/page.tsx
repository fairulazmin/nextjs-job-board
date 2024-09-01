"use client";

import {
  useForm,
  FieldValues,
  UseFormReturn,
  SubmitHandler,
  FieldPath,
  Control,
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

type FormValues = {
  firstName: string;
  lastName: string;
  sex: string;
};

export default function App() {
  const onSubmit = (data: FormValues) => console.log(data);
  const form = useForm<FormValues>();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-2xl mx-auto my-10 space-y-3"
      >
        <FormInput form={form} name="firstName" label="First Name" />
        <FormInput form={form} name="lastName" label="Last Name" />
        <FormInput form={form} name="sex" label="Sex" />
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
          <FormLabel onClick={() => console.log(field)}>{label}</FormLabel>
          <FormControl>
            <Input {...field} ref={(elm) => console.log(elm)} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

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
