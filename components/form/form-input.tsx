import React from "react";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

import { FormField, FormItem } from "@/components/ui/form";
import { FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Props<T extends FieldValues, P extends FieldPath<T>> = {
  form: UseFormReturn<T>;
  name: P;
  label: string;
  onTrigger?: () => void;
} & Omit<React.ComponentPropsWithoutRef<"input">, "form">;

export const FormInput = <T extends FieldValues, P extends FieldPath<T>>({
  form: { control },
  name,
  label,
  onTrigger,
  ...props
}: Props<T, P>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, ...fieldValues } }) => (
        <FormItem>
          {label !== "none" && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              {...fieldValues}
              onChange={(e) => {
                props.type === "file"
                  ? fieldValues.onChange(e.target.files?.[0])
                  : fieldValues.onChange(e);
                onTrigger && onTrigger();
              }}
              {...props}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
