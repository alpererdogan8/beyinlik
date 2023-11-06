import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";
import { Button } from "@/Components/ui/button";
import { Pagination } from "@/Components/layout/main/Pagination";

const humanizeTime = (date: string) => {
  const originalDate = new Date(date);
  const timeAgo = formatDistanceToNow(originalDate, {
    addSuffix: true,
    locale: tr,
  });
  return timeAgo;
};

export default function Dashboard({ auth, data }: PageProps) {
  return (
    <AuthenticatedLayout
      user={auth!.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 flex flex-col text-gray-900 dark:text-gray-100">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Yazan</TableHead>
                    <TableHead>Fotoğraf</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>İçerik Başlığı</TableHead>
                    <TableHead>Oluşturulma Tarihi</TableHead>
                    <TableHead>Güncelleme Tarihi</TableHead>
                    <TableHead>İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/*@ts-ignore*/}
                  {data?.articles.data.map((item: any) => {
                    return (
                      <TableRow key={item.id}>
                        <TableCell>
                          {item.author_name} &nbsp;
                          {item.author_surname}
                        </TableCell>
                        <TableCell>
                          <img className="w-28" src={item.image} />
                        </TableCell>
                        <TableCell>{item.category_name}</TableCell>
                        <TableCell className="w-44">{item.title}</TableCell>
                        <TableCell>{humanizeTime(item.created_at)}</TableCell>
                        <TableCell>{humanizeTime(item.updated_at)}</TableCell>
                        <TableCell className="flex flex-col gap-1">
                          <Button
                            asChild
                            className="text-xs dark:bg-lime-500 text-white"
                            size={"sm"}
                          >
                            <Link
                              href={route("content", {
                                category: item.category_slug,
                                slug: item.slug,
                              })}
                            >
                              Görüntüle
                            </Link>
                          </Button>

                          <Button
                            className="text-xs bg-indigo-600 dark:text-white"
                            size={"sm"}
                            variant={"default"}
                            asChild
                          >
                            <Link
                              href={route("edit", {
                                id: item.id.toString(),
                              })}
                            >
                              Düzenle
                            </Link>
                          </Button>
                          <Button
                            className="text-xs bg-red-500 text-white"
                            size={"sm"}
                            variant={"destructive"}
                            asChild
                          >
                            <Link
                              method="delete"
                              href={route("delete", {
                                id: item.id.toString(),
                              })}
                              onBefore={() =>
                                confirm("Are you sure you want to delete it?")
                              }
                              as="button"
                            >
                              Sil
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <div className=" self-center mt-5 ">
                <Pagination
                  path={data?.articles?.path!}
                  current_page={data?.articles?.current_page!}
                  from={data?.articles?.from!}
                  next_page_url={data?.articles?.next_page_url!}
                  prev_page_url={data?.articles?.prev_page_url!}
                  last_page={data?.articles?.last_page!}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
