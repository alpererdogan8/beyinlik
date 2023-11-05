import { formatDistanceToNow } from "date-fns";
import tr from "date-fns/locale/tr";
import { ToUp } from "./ToUp";
import { BreadCrumb } from "./BreadCrumbs";

type TContent = {
  article: [
    {
      title: string;
      image: string;
      created_at: string;
      content: string;
      author_name: string;
      author_surname: string;
      category_name: string;
    },
  ];
};

export const CardContent = ({ data }: { data: TContent }) => {
  const originalDate = new Date(data.article[0]?.created_at!);

  const timeAgo = formatDistanceToNow(originalDate, {
    addSuffix: true,
    locale: tr,
  });
  return (
    <div className="w-11/12  lg:w-8/12">
      <ToUp />
      <header>
        <BreadCrumb />
        <h1 className="text-4xl font-black w-full text-center pt-6">
          {data?.article[0].title!}
        </h1>
        <h3 className="w-full flex justify-between py-4">
          <div className="flex flex-col xl:flex-row xl:gap-x-8">
            <p>Kategori: {data?.article[0].category_name!}</p>
            <p>
              Yazan: {data?.article[0].author_name!}{" "}
              {data?.article[0].author_surname!}
            </p>
          </div>
          <span>Tarih: {timeAgo}</span>
        </h3>
      </header>
      <div className="w-full flex flex-col items-center justify-center">
        <img
          className="object-contain rounded-2xl"
          width={900}
          height={900}
          src={`${window.location.origin}/${data?.article[0].image!}`}
          alt=""
        />
        <pre
          className="whitespace-pre-line mt-5   w-full prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none"
          dangerouslySetInnerHTML={{ __html: data?.article[0].content! }}
        ></pre>
      </div>
    </div>
  );
};
