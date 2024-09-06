import { useCallback, useState } from "react";
import { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Underline,
  Italic,
  Bold,
  Subscript,
  Superscript,
  Strikethrough,
  Undo,
  Redo,
  List,
  ListOrdered,
  Link,
} from "lucide-react";

export const Toolbar = ({ editor }: { editor: Editor | null }) => {
  const [linkUrl, setLinkUrl] = useState("");

  const setLink = useCallback(() => {
    if (!editor || !linkUrl) {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    // Basic URL validation
    if (!/^https?:\/\//.test(linkUrl)) {
      alert("Please enter a valid URL starting with http:// or https://");
      return;
    }
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: linkUrl })
      .run();
  }, [editor, linkUrl]);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex space-x-1 p-1">
      <Button
        size="sm"
        type="button"
        variant={editor.isActive("bold") ? "secondary" : "ghost"}
        onClick={() => {
          editor.chain().focus().toggleBold().run();
        }}
      >
        <Bold className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        type="button"
        variant={editor.isActive("italic") ? "secondary" : "ghost"}
        onClick={() => {
          editor.chain().focus().toggleItalic().run();
        }}
      >
        <Italic className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        type="button"
        variant={editor.isActive("underline") ? "secondary" : "ghost"}
        onClick={() => {
          editor.chain().focus().toggleUnderline().run();
        }}
      >
        <Underline className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        type="button"
        variant={editor.isActive("strike") ? "secondary" : "ghost"}
        onClick={() => {
          editor.chain().focus().toggleStrike().run();
        }}
      >
        <Strikethrough className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        type="button"
        variant={editor.isActive("subscript") ? "secondary" : "ghost"}
        onClick={() => {
          editor.chain().focus().toggleSubscript().run();
        }}
      >
        <Subscript className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        type="button"
        variant={editor.isActive("superscript") ? "secondary" : "ghost"}
        onClick={() => {
          editor.chain().focus().toggleSuperscript().run();
        }}
      >
        <Superscript className="w-4 h-4" />
      </Button>
      <Separator orientation="vertical" className="h-auto" />
      <Button
        size="sm"
        type="button"
        variant={editor.isActive("bulletList") ? "secondary" : "ghost"}
        onClick={() => {
          editor.chain().focus().toggleBulletList().run();
        }}
      >
        <List className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        type="button"
        variant={editor.isActive("orderedList") ? "secondary" : "ghost"}
        onClick={() => {
          editor.chain().focus().toggleOrderedList().run();
        }}
      >
        <ListOrdered className="w-4 h-4" />
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="sm"
            type="button"
            variant={editor.isActive("link") ? "secondary" : "ghost"}
          >
            <Link className="w-4 h-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="flex flex-col space-y-2">
            <Input
              type="url"
              placeholder="Enter URL"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => editor.chain().focus().unsetLink().run()}
                disabled={!editor.isActive("link")}
              >
                Remove Link
              </Button>
              <Button size="sm" onClick={setLink}>
                {editor.isActive("link") ? "Update Link" : "Add Link"}
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <Separator orientation="vertical" className="h-auto" />
      <Button
        size="sm"
        type="button"
        variant="ghost"
        disabled={!editor.can().chain().focus().undo().run()}
        onClick={() => {
          editor.chain().focus().undo().run();
        }}
      >
        <Undo className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        type="button"
        variant="ghost"
        disabled={!editor.can().chain().focus().redo().run()}
        onClick={() => {
          editor.chain().focus().redo().run();
        }}
      >
        <Redo className="w-4 h-4" />
      </Button>
    </div>
  );
};
