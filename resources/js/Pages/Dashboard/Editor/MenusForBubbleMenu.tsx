import { Button } from "@/Components/ui/button";
import { BubbleMenu, useCurrentEditor } from "@tiptap/react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  BoldIcon,
  Heading,
  Heading1,
  Heading2,
  Heading3,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  UnderlineIcon,
} from "lucide-react";

export const MenusForBubbleMenu: React.FC = () => {
  const { editor } = useCurrentEditor();
  if (!editor) {
    return null;
  }

  return (
    <BubbleMenu className="transition-all w-[900px] flex flex-wrap gap-1">
      <Button
        type="button"
        className="w-10 h-10"
        variant={"outline"}
        size={"icon"}
        onClick={() => editor.chain().focus().setParagraph().run()}
      >
        <Heading />
      </Button>
      <Button
        type="button"
        className="w-10 h-10"
        variant={"outline"}
        size={"icon"}
        onClick={() => editor.chain().focus().setHeading({ level: 1 }).run()}
      >
        <Heading1 />
      </Button>
      <Button
        type="button"
        className="w-10 h-10"
        variant={"outline"}
        size={"icon"}
        onClick={() => editor.chain().focus().setHeading({ level: 2 }).run()}
      >
        <Heading2 />
      </Button>
      <Button
        type="button"
        className="w-10 h-10"
        variant={"outline"}
        size={"icon"}
        onClick={() => editor.chain().focus().setHeading({ level: 3 }).run()}
      >
        <Heading3 />
      </Button>

      <Button
        type="button"
        className="w-10 h-10"
        variant={"outline"}
        size={"icon"}
        onClick={() => editor.chain().focus().setBold().run()}
      >
        <BoldIcon />
      </Button>
      <Button
        type="button"
        className="w-10 h-10"
        variant={"outline"}
        size={"icon"}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <UnderlineIcon />
      </Button>
      <Button
        type="button"
        className="w-10 h-10"
        variant={"outline"}
        size={"icon"}
        onClick={() => editor.chain().focus().setItalic().run()}
      >
        <ItalicIcon />
      </Button>
      <Button
        type="button"
        className="w-10 h-10"
        variant={"outline"}
        size={"icon"}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <ListIcon />
      </Button>
      <Button
        type="button"
        className="w-10 h-10"
        variant={"outline"}
        size={"icon"}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrderedIcon />
      </Button>
      <Button
        type="button"
        className="w-10 h-10"
        variant={"outline"}
        size={"icon"}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        <AlignLeft />
      </Button>
      <Button
        type="button"
        className="w-10 h-10"
        variant={"outline"}
        size={"icon"}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        <AlignCenter />
      </Button>
      <Button
        type="button"
        className="w-10 h-10"
        variant={"outline"}
        size={"icon"}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        <AlignRight />
      </Button>
      <Button
        type="button"
        variant={"outline"}
        className="w-10 h-10 p-1"
        asChild
      >
        <input
          type="color"
          onInput={(event: any) =>
            editor
              .chain()
              .focus()
              .setColor(event.target?.value)
              .run()
          }
          value={editor.getAttributes("textStyle").color}
          data-testid="setColor"
        />
      </Button>
      <Button
        type="button"
        className="w-10 h-10"
        variant={"outline"}
        size={"icon"}
        onClick={() => editor.chain().focus().setFontFamily("Figtree").run()}
      >
        Figtree
      </Button>
    </BubbleMenu>
  );
};
