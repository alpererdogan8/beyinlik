/* eslint-disable react-hooks/rules-of-hooks */
import {
  BracesIcon,
  Image,
  LucideYoutube,
  MinusIcon,
  TextQuoteIcon,
  XCircleIcon,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useCurrentEditor } from "@tiptap/react";
import { Button } from "@/Components/ui/button";

export default function TipTapDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const inputFileUpload = useRef<HTMLInputElement | null>(null);
  const { editor } = useCurrentEditor();
  if (!editor) {
    return null;
  }

  const addImage = (inputFileUpload: React.ChangeEvent<HTMLInputElement>) => {
    if (inputFileUpload.currentTarget.files) {
      const file = inputFileUpload.currentTarget?.files[0];
      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          if (e.target?.result) {
            const base64Image = e.target.result as string;
            editor.chain().focus().setImage({ src: base64Image }).run();
          }
        };

        reader.readAsDataURL(file);
      }
    }
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const clickInput = () => {
    if (inputFileUpload.current) {
      inputFileUpload.current.click();
    }
  };

  const addYoutube = () => {
    const src: string = prompt("Youtube Linki Giriniz") as string;
    editor.chain().focus().setYoutubeVideo({ src }).run();
  };

  const addCode = () => {
    editor.chain().focus().toggleCodeBlock().run();
  };
  const addHardBreak = () => {
    editor.chain().focus().setHorizontalRule().run();
  };
  const addBlockQuote = () => {
    editor.chain().focus().setBlockquote().run();
  };
  return (
    <div className="flex absolute  -left-[60px] items-center justify-between rounded-4xl rounded-full w-full ">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant={"link"}
        className="w-auto h-0 p-0 rounded-full"
        type="button"
      >
        <XCircleIcon
          width={42}
          className={`transition-all stroke-1 ${
            isOpen ? "rotate-0" : "rotate-45"
          }`}
          size={48}
        />
      </Button>
      <div
        className={`absolute flex items-center left-12 w-96 transition-all ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        {!isOpen ? null : (
          <>
            <Button
              variant={"outline"}
              className="mx-auto text-center w-6 h-6 p-6 rounded-full"
              onClick={clickInput}
              type="button"
            >
              <span>
                <Image />
                <input
                  ref={inputFileUpload!}
                  onChange={addImage}
                  type="file"
                  className="hidden"
                />
              </span>
            </Button>
            <Button
              variant={"outline"}
              onClick={addYoutube}
              className="mx-auto text-center w-0 h-0 p-6 rounded-full"
              type="button"
            >
              <span>
                <LucideYoutube />
              </span>
            </Button>

            <Button
              variant={"outline"}
              onClick={addCode}
              className="mx-auto text-center w-0 h-0 p-6 rounded-full"
              type="button"
            >
              <span>
                <BracesIcon />
              </span>
            </Button>
            <Button
              variant={"outline"}
              onClick={addHardBreak}
              className="mx-auto text-center w-0 h-0 p-6 rounded-full"
              type="button"
            >
              <span>
                <MinusIcon />
              </span>
            </Button>
            <Button
              variant={"outline"}
              onClick={addBlockQuote}
              className="mx-auto text-center w-0 h-0 p-6 rounded-full"
              type="button"
            >
              <span>
                <TextQuoteIcon />
              </span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
