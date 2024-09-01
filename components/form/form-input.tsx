import React from "react";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

import { FormField, FormItem } from "@/components/ui/form";
import { FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Props<T extends FieldValues, P extends FieldPath<T>> = {
  form: UseFormReturn<T>;
  name: P;
  label: string;
} & Omit<React.ComponentPropsWithoutRef<"input">, "form">;

export const FormInput = <T extends FieldValues, P extends FieldPath<T>>({
  form: { control },
  name,
  label,
  ...props
}: Props<T, P>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label !== "none" && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input {...field} ref={field.ref} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
