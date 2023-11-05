import { CardGroup } from "@/Components/layout/main/CardGroup";
import { Pagination } from "@/Components/layout/main/Pagination";
import GuestLayout from "@/Layouts/Layout";
import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { Suspense } from "react";

export default function Main() {
  const { props } = usePage<PageProps>();

  return (
    <GuestLayout>
      <Suspense fallback={<>loading...</>}>
        <CardGroup data={props?.data as any} />
      </Suspense>
      <Pagination
        path={props.data?.articles?.path!}
        current_page={props.data?.articles?.current_page!}
        from={props.data?.articles?.from!}
        next_page_url={props.data?.articles?.next_page_url!}
        prev_page_url={props.data?.articles?.prev_page_url!}
        last_page={props.data?.articles?.last_page!}
      />
    </GuestLayout>
  );
}
