"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Underline as UnderlineExt } from "@tiptap/extension-underline";
import { Subscript as SubscriptExt } from "@tiptap/extension-subscript";
import { Superscript as SuperscriptExt } from "@tiptap/extension-superscript";
import { Link } from "@tiptap/extension-link";

import { Separator } from "@/components/ui/separator";
import { Toolbar } from "@/components/tiptap/editor-toolbar";

type TipTapProps = {
  content: string;
  onChange: (value: string) => void;
};

export const Tiptap = React.forwardRef<HTMLDivElement, TipTapProps>(
  ({ content, onChange }, ref) => {
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
        Link.configure({
          openOnClick: false,
          autolink: true,
          defaultProtocol: "https",
        }),
      ],
      content,
      editorProps: {
        attributes: {
          class:
            "editor-container min-h-[80px] text-sm m-2 placeholder:text-muted-foreground focus:outline-none",
        },
      },
      onUpdate: ({ editor }) => {
        onChange(editor.getHTML());
      },
      immediatelyRender: false,
    });

    return (
      <div
        ref={ref}
        className="flex flex-col w-full rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Toolbar editor={editor} />
        <Separator className="w-auto mx-1" />
        <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
      </div>
    );
  },
);
