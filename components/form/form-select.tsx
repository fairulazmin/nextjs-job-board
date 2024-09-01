import React from "react";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type Props<T extends FieldValues, P extends FieldPath<T>, K extends string> = {
  form: UseFormReturn<T>;
  name: P;
  label: string;
  options: K[];
};

export const FormSelect = <
  T extends FieldValues,
  P extends FieldPath<T>,
  K extends string,
>({
  form: { control },
  name,
  label,
  options,
}: Props<T, P, K>) => {
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
};
