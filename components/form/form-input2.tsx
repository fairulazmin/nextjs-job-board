import React from "react";
import {
  FieldValues,
  FieldPath,
  useFormContext,
  Control,
} from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";

import { FormField, FormItem } from "@/components/ui/form";
import { FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Props<T extends FieldValues, P extends FieldPath<T>> = {
  form: UseFormReturn<T>;
  name: P;
  label: string;
} & React.ComponentPropsWithoutRef<"input">;

export const FormInput = <T extends FieldValues, P extends FieldPath<T>>({
  form,
  name,
  label,
  ...props
}: Props<T, P>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label !== "none" && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input {...field} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
