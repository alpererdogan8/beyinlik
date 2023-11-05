import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
  Card as CardShadcn,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Link } from "@inertiajs/react";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";

type TCard = {
  image: string;
  title: string;
  category: string;
  category_slug: string;
  created_at: string;
  content_slug: string;
  content: string;
};

export const Card = ({
  title,
  content_slug,
  image,
  category_slug,
  category,
  content,
  created_at,
}: TCard) => {
  const originalDate = new Date(created_at);
  const timeAgo = formatDistanceToNow(originalDate, {
    addSuffix: true,
    locale: tr,
  });
  const truncateAndPreserveTags = (text: string, maxLength: number) => {
    let result = "";
    let inTag = false;

    for (let i = 0; i < text.length; i++) {
      if (text[i] === "<") {
        inTag = true;
        const closeTagIndex = text.indexOf(">", i);
        if (closeTagIndex !== -1) {
          const tag = text.substring(i, closeTagIndex + 1);

          if (tag.match(/<(div|p|span)\b/)) {
            result += tag;
          }

          i = closeTagIndex;
          inTag = false;
        }
      } else if (!inTag) {
        result += text[i];
      }
    }

    const truncatedText = result.substring(0, maxLength);
    return truncatedText + "...";
  };
  const cleanHtml = (html: any) => {
    // Inline stil özelliklerini kaldır
    let cleanedHtml = html.replace(/ style="[^"]*"/g, "");

    // Fazla satır boşluklarını temizle, yalnızca 1 satır boşluk bırak
    cleanedHtml = cleanedHtml.replace(/[\r\n]+/g, "\n");

    return cleanedHtml;
  };
  return (
    <Link
      href={route("content", {
        category: category_slug,
        slug: content_slug,
      })}
    >
      <CardShadcn className="w-[350px] h-full min-h-[500px] flex flex-col justify-between hover:drop-shadow-xl transition-all">
        <div>
          <CardHeader>
            <img
              loading="lazy"
              className="pb-3"
              src={`${window.location.origin}/${image}`}
              alt={title}
            />

            <CardTitle className="flex justify-between">{title}</CardTitle>
            <CardDescription className="flex justify-between">
              <span>{timeAgo}</span>
              <Badge>{category}</Badge>
            </CardDescription>
          </CardHeader>

          <CardContent
            className="py-1 flex-wrap whitespace-pre-wrap truncate line-clamp-3"
            dangerouslySetInnerHTML={{
              __html: cleanHtml(content),
            }}
          ></CardContent>
        </div>
        <CardFooter className="flex  justify-between ">
          <Button className="w-full mt-2" asChild>
            <Link
              href={route("content", {
                category: category_slug,
                slug: content_slug,
              })}
            >
              Devamını oku
            </Link>
          </Button>
        </CardFooter>
      </CardShadcn>
    </Link>
  );
};
