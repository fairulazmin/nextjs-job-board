import React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

import { fixedForwardRef } from "@/lib/utils";
import { FormField, FormItem } from "@/components/ui/form";
import { FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Props<T extends FieldValues, P extends FieldPath<T>> = {
  control: Control<T>;
  name: P;
  label: string;
} & React.ComponentPropsWithoutRef<"input">;

export const FormInput = fixedForwardRef(
  <T extends FieldValues, P extends FieldPath<T>>(
    { control, name, label, ...props }: Props<T, P>,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input {...field} ref={ref} {...props} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  },
);
