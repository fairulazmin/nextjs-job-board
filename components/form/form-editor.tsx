import React, { useRef } from "react";
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
  form: { control },
  name,
  label,
}: Props<T, P>) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const setEditorFocus = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel onClick={setEditorFocus}>{label}</FormLabel>
          {/* <FormLabel>{label}</FormLabel> */}
          <FormControl>
            <Tiptap {...field} ref={editorRef} content={field.value} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
