import { CardContent } from "@/Components/layout/main/CardContent";
import GuestLayout from "@/Layouts/Layout";
import { usePage } from "@inertiajs/react";

export default function Content() {
  const { props } = usePage();
  return (
    <GuestLayout>
      <CardContent data={props.data as any} />
    </GuestLayout>
  );
}
