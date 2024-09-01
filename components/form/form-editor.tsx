import React from "react";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

import { FormField, FormItem } from "@/components/ui/form";
import { FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Tiptap } from "@/components/tiptap/tiptap";

type Props<T extends FieldValues, P extends FieldPath<T>> = {
  form: UseFormReturn<T>;
  name: P;
  label: string;
};

export const FormEditor = <T extends FieldValues, P extends FieldPath<T>>({
  form: { control, setFocus },
  name,
  label,
}: Props<T, P>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel onClick={() => setFocus(name)}>{label}</FormLabel>
          {/* <FormLabel>{label}</FormLabel> */}
          <FormControl>
            <Tiptap
              content={field.value}
              onChange={field.onChange}
              ref={field.ref}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
