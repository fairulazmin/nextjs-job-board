import React from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form";

import { cn, fixedForwardRef } from "@/lib/utils";
import { FormField, FormItem } from "@/components/ui/form";
import { FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Tiptap } from "@/components/tiptap/tiptap";

type Props<T extends FieldValues, P extends FieldPath<T>> = {
  control: Control<T>;
  name: P;
  label: string;
};

export const FormEditor = fixedForwardRef(
  <T extends FieldValues, P extends FieldPath<T>>({
    control,
    name,
    label,
  }: Props<T, P>) => {
    const form = useFormContext();

    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel onClick={() => form.setFocus(name)}>{label}</FormLabel>
            <FormControl>
              <Tiptap value={field.value} name={name} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  },
);
