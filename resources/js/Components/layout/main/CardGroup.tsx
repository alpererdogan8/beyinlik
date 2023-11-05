import { Suspense } from "react";
import { Card } from "./Card";
import { usePage } from "@inertiajs/react";
import { PageProps, TCardGroup } from "@/types";
import { CardSkeleton } from "./CardSkeleton";

export const CardGroup = ({ data }: TCardGroup) => {
  const page = usePage<PageProps>();

  return (
    <div className="w-full justify-evenly gap-10 my-10 px-1 flex flex-wrap ">
      <Suspense fallback={<>Loading...</>}>
        {!data ? (
          <CardSkeleton />
        ) : (
          data.articles &&
          data.articles.data.map((item: any) => {
            const matchedCategory = page.props.data?.categories.find(
              (category: any) => category.id === item.category_id,
            );
            let category_slug = (matchedCategory as unknown as { slug: string })
              ?.slug;
            return (
              <Card
                key={item.id}
                image={item.image}
                title={item.title}
                category={item.category_name}
                category_slug={category_slug}
                created_at={item.created_at}
                content_slug={item.slug}
                content={item.content}
              />
            );
          })
        )}
      </Suspense>
    </div>
  );
};
