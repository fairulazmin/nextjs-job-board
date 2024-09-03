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
  onTrigger?: (value: K) => void;
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
  onTrigger,
}: Props<T, P, K>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={(e) => {
              field.onChange(e);
              if (onTrigger) {
                onTrigger(e as K);
              }
            }}
            defaultValue={field.value}
          >
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
