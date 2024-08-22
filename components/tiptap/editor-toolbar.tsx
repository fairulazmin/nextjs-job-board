import { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Underline,
  Italic,
  Bold,
  Subscript,
  Superscript,
  Strikethrough,
  List,
  ListOrdered,
} from "lucide-react";

export const Toolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex space-x-1 p-1">
      <Button
        size="sm"
        variant={editor.isActive("bold") ? "secondary" : "ghost"}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBold().run();
        }}
      >
        <Bold className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("italic") ? "secondary" : "ghost"}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleItalic().run();
        }}
      >
        <Italic className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("underline") ? "secondary" : "ghost"}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleUnderline().run();
        }}
      >
        <Underline className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("strike") ? "secondary" : "ghost"}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleStrike().run();
        }}
      >
        <Strikethrough className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("subscript") ? "secondary" : "ghost"}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleSubscript().run();
        }}
      >
        <Subscript className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("superscript") ? "secondary" : "ghost"}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleSuperscript().run();
        }}
      >
        <Superscript className="w-4 h-4" />
      </Button>
      <Separator orientation="vertical" className="h-auto" />
      <Button
        size="sm"
        variant={editor.isActive("bulletList") ? "secondary" : "ghost"}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBulletList().run();
        }}
      >
        <List className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("orderedList") ? "secondary" : "ghost"}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleOrderedList().run();
        }}
      >
        <ListOrdered className="w-4 h-4" />
      </Button>
    </div>
  );
};
