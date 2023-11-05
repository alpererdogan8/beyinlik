import { useCurrentEditor } from "@tiptap/react";
import { useEffect } from "react";
import { ControllerRenderProps } from "react-hook-form";

export default function FormDataEditor({
  field,
}: {
  field: Pick<ControllerRenderProps, "onChange">;
}) {
  const { editor } = useCurrentEditor();

  useEffect(() => {
    field.onChange(editor!.getHTML());
  }, [editor!.getHTML()]);
  return <></>;
}
