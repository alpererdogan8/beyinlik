import { Button } from "@/Components/ui/button";
import { TPagination } from "@/types";
import { Link } from "@inertiajs/react";
import { FC, Fragment, useState } from "react";

export const Pagination: FC<TPagination> = (data) => {
  return (
    <div className="flex gap-1 mb-10 flex-row">
      <Button
        variant={"outline"}
        className="pt-2.5"
        disabled={data.prev_page_url ? false : true}
        asChild={!data.prev_page_url ? false : true}
      >
        <Link href={data.prev_page_url}>Geri</Link>
      </Button>
      {Array.from({ length: data.last_page }, (_, item) => item + 1).map(
        (item, key) => {
          return (
            <Fragment key={key}>
              <Button
                className={`${
                  data.current_page === item
                    ? "dark:bg-slate-900 bg-slate-200"
                    : ""
                }`}
                key={item}
                variant={"outline"}
                asChild
              >
                <Link className="pt-2.5" href={`${data.path}?page=${item}`}>
                  {item}
                </Link>
              </Button>
            </Fragment>
          );
        },
      )}
      <Button
        variant={"outline"}
        className="pt-2.5"
        disabled={data.next_page_url ? false : true}
        asChild={!data.next_page_url ? false : true}
      >
        <Link href={data.next_page_url}>İleri</Link>
      </Button>
    </div>
  );
};
