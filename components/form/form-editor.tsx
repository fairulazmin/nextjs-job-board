import React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

import { FormField, FormItem } from "@/components/ui/form";
import { FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Tiptap } from "@/components/tiptap/tiptap";

type Props<T extends FieldValues, P extends FieldPath<T>> = {
  control: Control<T>;
  name: P;
  label: string;
};

export const FormEditor = <T extends FieldValues, P extends FieldPath<T>>({
  control,
  name,
  label,
}: Props<T, P>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Tiptap value={field.value} name={name} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
