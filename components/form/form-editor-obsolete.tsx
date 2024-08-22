import React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { Editor, EditorProps } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { cn, fixedForwardRef } from "@/lib/utils";
import { FormField, FormItem } from "@/components/ui/form";
import { FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { draftToMarkdown } from "markdown-draft-js";

type Props<T extends FieldValues, P extends FieldPath<T>> = {
  control: Control<T>;
  name: P;
  label: string;
} & EditorProps;

export const FormEditor = fixedForwardRef(
  <T extends FieldValues, P extends FieldPath<T>>(
    { control, name, label, editorClassName, onChange, ...props }: Props<T, P>,
    ref: React.ForwardedRef<Object>,
  ) => {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Editor
                {...field}
                onChange={(draft) => draftToMarkdown(draft)}
                editorClassName={cn(
                  "border rounded-md px-3 min-h-[150px] cursor-text ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
                  editorClassName,
                )}
                editorRef={(r) => {
                  if (typeof ref === "function") {
                    ref(r);
                  } else if (ref) {
                    ref.current = r;
                  }
                }}
                toolbar={{
                  options: ["inline", "list", "link", "history"],
                  inline: { options: ["bold", "italic", "underline"] },
                }}
                {...props}
              />
              )
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  },
);
