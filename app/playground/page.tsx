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
        className="max-w-2xl mx-auto my-10"
      >
        <FormInput form={form} name="firstName" />
        <FormInput form={form} name="lastName" />
        <FormInput form={form} name="sex" />
      </form>
    </Form>
  );
}

type FormInputProps<T extends FieldValues, P extends FieldPath<T>> = {
  form: UseFormReturn<T>;
  name: P;
} & Omit<React.ComponentPropsWithoutRef<"input">, "form">;

const FormInput = <T extends FieldValues, P extends FieldPath<T>>({
  form,
  name,
  ...props
}: FormInputProps<T, P>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>First Name</FormLabel>
          <FormControl>
            <Input {...field} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
