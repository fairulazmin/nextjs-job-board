import React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

import { Select } from "@/components/custom/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { fixedForwardRef } from "@/lib/utils";

type Props<T extends FieldValues, P extends FieldPath<T>, K extends string> = {
  control: Control<T>;
  name: P;
  label: string;
  options: K[];
} & React.ComponentPropsWithoutRef<"select">;

export const FormSelect = fixedForwardRef(
  <T extends FieldValues, P extends FieldPath<T>, K extends string>(
    { control, name, label, options, ...props }: Props<T, P, K>,
    ref: React.ForwardedRef<HTMLSelectElement>,
  ) => {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Select {...field} ref={ref} {...props}>
                <option value="" hidden>
                  Select an option
                </option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  },
);
