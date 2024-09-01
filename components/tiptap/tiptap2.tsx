"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useFormContext } from "react-hook-form";
import { Underline as UnderlineExt } from "@tiptap/extension-underline";
import { Subscript as SubscriptExt } from "@tiptap/extension-subscript";
import { Superscript as SuperscriptExt } from "@tiptap/extension-superscript";

import { Separator } from "@/components/ui/separator";
import { Toolbar } from "@/components/tiptap/editor-toolbar";

export const Tiptap = ({ value, name }: { value: string; name: string }) => {
  const { setValue } = useFormContext();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` because marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` because marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
      UnderlineExt,
      SubscriptExt,
      SuperscriptExt,
    ],
    editorProps: {
      attributes: {
        class:
          "min-h-[80px] text-sm m-2 placeholder:text-muted-foreground focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      setValue(name, content, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    content: value,
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor?.isEmpty) editor.commands.setContent(value);
  }, [value]);

  return (
    <div className="group flex flex-col w-full rounded-md ring-offset-background border border-input bg-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
      <Toolbar editor={editor} />
      <Separator className="w-auto mx-1" />
      <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
    </div>
  );
};
