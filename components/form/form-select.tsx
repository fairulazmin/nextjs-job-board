import React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import {
  FormControl,
  FormDescription,
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
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  },
);
