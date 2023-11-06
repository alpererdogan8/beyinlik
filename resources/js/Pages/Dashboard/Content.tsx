import {
  BubbleMenu,
  EditorProvider,
  FloatingMenu,
  useCurrentEditor,
  mergeAttributes,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Code } from "@tiptap/extension-code";
import { Color } from "@tiptap/extension-color";
import { HardBreak } from "@tiptap/extension-hard-break";
import { Image } from "@tiptap/extension-image";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Underline } from "@tiptap/extension-underline";
import { ListItem } from "@tiptap/extension-list-item";
import { FontFamily } from "@tiptap/extension-font-family";
import { Youtube } from "@tiptap/extension-youtube";
import { Link } from "@tiptap/extension-link";
import { Text } from "@tiptap/extension-text";
import { Button } from "@/Components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, useForm as useFormInertia } from "@inertiajs/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useRef, useState } from "react";
import { MenusForBubbleMenu } from "./Editor/MenusForBubbleMenu";
import TipTapDropdown from "./Editor/TipTapDropdown";
import FormDataEditor from "./Editor/FormDataEditor";

const FormSchema = z.object({
  title: z.string({
    required_error: "Please select Title",
  }),
  category: z.string({
    required_error: "Please select Category",
  }),
  author: z.string({
    required_error: "Please select Author",
  }),
  image: z
    .object({
      name: z.string().min(1),
      type: z.string().refine((value) => value.startsWith("image/"), {
        message: "File type must be image",
      }),
      size: z
        .number()
        .min(1)
        .max(2 * 1024 * 1024),
    })
    .optional(),
  content: z.string({
    required_error: "Please write Content",
  }),
});

const extensions = [
  StarterKit,
  Text,
  Youtube,
  TextStyle,
  FontFamily.configure({
    types: ["textStyle"],
  }),
  Underline,
  ListItem,
  Color.configure({
    types: ["textStyle"],
  }),
  Code,
  HardBreak,
  Link.configure({
    autolink: true,
    linkOnPaste: true,
    openOnClick: true,
  }),
  TextAlign.configure({
    types: ["heading", "paragraph", "image", "div", "iframe"],
    alignments: ["left", "center", "right"],
    defaultAlignment: "left",
  }),
  Image.extend({
    addOptions: () => {
      return {
        ...Image.options,
      };
    },
    renderHTML({ HTMLAttributes }) {
      const { style } = HTMLAttributes;

      const tailwindCSSAlign = {
        "text-align: right": "mx-auto mr-0",
        "text-align: center": "mx-auto",
        "text-align: left": "mx-auto ml-0",
      };

      return [
        "figure",
        // @ts-ignore
        { class: tailwindCSSAlign[style] },
        // @ts-ignore
        [
          "img",
          // @ts-ignore
          mergeAttributes({ class: tailwindCSSAlign[style] }, HTMLAttributes),
        ],
      ];
    },
  }),
];

const CreateContent = ({ auth, data }: PageProps) => {
  const [imageState, setImageState] = useState<File | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: data?.articles?.title ?? "",
      author: data?.articles?.authors_id!.toString() ?? "",
      category: data?.articles?.category_id!.toString() ?? "",
      content: data?.articles?.content ?? "",
    },
  });
  const {
    post,
    setData,
    data: formData,
  } = useFormInertia<z.infer<typeof FormSchema>>({
    author: "",
    category: "",
    content: "",
    image: {
      name: "",
      size: 0,
      type: "",
    },
    title: "",
  });

  const onSubmit: SubmitHandler<any> = (dataSubmit = formData, event) => {
    event?.preventDefault();
    if (typeof data?.articles !== "undefined") {
      return post(data.articles.id.toString(), {
        data: dataSubmit,
        method: "put",
      });
    }
    return post("create", { data: dataSubmit });
  };
  useEffect(() => {
    const watchForm = form.watch();
    setData(watchForm);
  }, [
    form.watch().author,
    form.watch().category,
    form.watch().content,
    form.watch().image,
    form.watch().title,
  ]);

  return (
    <AuthenticatedLayout
      user={auth!.user}
      header={
        <h2 className="font-semibold text-4xl text-center sm:text-left text-gray-800 dark:text-gray-200 leading-tight">
          Create Content
        </h2>
      }
    >
      <Head title="Create Content" />

      <div className="py-0 sm:py-6 lg:py-12 ">
        <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="py-12 flex flex-col justify-center items-center  text-gray-900 dark:text-gray-100">
              <Form {...form}>
                <form
                  method="post"
                  action={route("create")}
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-11/12 space-y-6"
                  encType="multipart/form-data"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>

                        <FormControl>
                          <Input
                            className="dark:bg-gray-900"
                            placeholder="Something"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="dark:bg-gray-900">
                              <SelectValue placeholder="Select a Category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="dark:bg-gray-900">
                            {data?.categories.map((category: any) => {
                              return (
                                <SelectItem
                                  value={category.id.toString()}
                                  key={category.id}
                                >
                                  {category.name}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Author</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="dark:bg-gray-900">
                              <SelectValue placeholder="Select a Author" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="dark:bg-gray-900">
                            {data?.authors.map((author: any) => {
                              return (
                                <SelectItem
                                  value={author.id.toString()}
                                  key={author.id}
                                >
                                  {author.name}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-6 flex-col md:flex-row item-center justify-center md:justify-between">
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Upload Image</FormLabel>

                          <FormControl>
                            <Input
                              className="w-full md:w-10/12 file:mr-3 file:bg-primary file:text-primary-foreground hover:file:bg-slate-500 file:rounded-md dark:bg-gray-900"
                              type="file"
                              multiple={false}
                              name="image"
                              onChange={(e) => {
                                field.onChange(
                                  e.target.files ? e.target.files[0] : null,
                                );
                                setImageState(
                                  e.target.files ? e.target.files[0] : null,
                                );
                              }}
                              accept="image/*"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-3 justify-center">
                      {data?.articles && !imageState ? (
                        <img
                          className="h-60 object-cover aspect-square"
                          src={`${window.location.origin}/${
                            data!.articles.image
                          }`}
                        />
                      ) : (
                        <div
                          className={` ${
                            imageState ? "" : "border"
                          }  border-1 flex justify-center items-center border-dashed border-white text-white text-xl w-60 h-60`}
                        >
                          {imageState ? (
                            <img
                              className="h-60 object-cover aspect-square w-full"
                              src={URL.createObjectURL(imageState)}
                              alt=""
                            />
                          ) : (
                            ""
                          )}
                          {!imageState ? "Image" : null}
                        </div>
                      )}
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <>
                            <h1 className="text-4xl w-full text-center">
                              Content
                            </h1>
                            <div className="border-2  dark:bg-gray-900 pt-0 pb-5 px-12  w-full rounded-xl">
                              <EditorProvider
                                editable
                                onCreate={({ editor }) => {
                                  editor.commands.setFontFamily("Figtree");
                                }}
                                content={
                                  data?.articles && data.articles.content
                                }
                                slotAfter={
                                  <h1 className="text-sm ml-5">
                                    <b>New next line</b>
                                    <code
                                      className={`bg-primary text-white  font-sans  dark:bg-primary/20 py-0.5 px-2 ml-2 rounded-2xl`}
                                    >
                                      Shift
                                    </code>
                                    <span className="mx-1">+</span>
                                    <code
                                      className={`bg-primary text-white   dark:bg-primary/20 py-0.5 px-2 mr-2 rounded-2xl`}
                                    >
                                      Enter
                                    </code>
                                  </h1>
                                }
                                extensions={extensions}
                                editorProps={{
                                  attributes: {
                                    class:
                                      "font-figtree flex flex-col w-full prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none font-sans",
                                  },
                                }}
                              >
                                <FormDataEditor field={field} />
                                <MenusForBubbleMenu />
                                <FloatingMenu>
                                  <TipTapDropdown />
                                </FloatingMenu>
                              </EditorProvider>
                            </div>
                          </>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="w-full" type="submit">
                    Submit
                  </Button>
                </form>
              </Form>{" "}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default CreateContent;
