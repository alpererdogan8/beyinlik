import { Link, usePage } from "@inertiajs/react";
import { Home, HomeIcon } from "lucide-react";
import { useEffect, useState } from "react";

export const BreadCrumb = () => {
  const page = usePage();
  const [breadCrumb] = useState(page.url.split("/"));
  return (
    <>
      <p className=" flex text-xl font-extrabold pt-5 ">
        <Link href="/" className="hover:underline underline-offset-4">
          Anasayfa
        </Link>{" "}
        {/* <span className="mx-2">/</span> */}
        {breadCrumb.map((link: string, linkItem: number): any => {
          if (
            breadCrumb.length - 1 === linkItem ||
            link === "" ||
            linkItem === 1
          )
            return;

          const categoryName = link
            .split("-")
            .map((item) => item.charAt(0).toLocaleUpperCase() + item.slice(1))
            .join(" ");

          return (
            <>
              <span className="mx-2">/</span>
              <Link
                href={route("content", {
                  category: link,
                  slug: "",
                })}
                className="hover:underline underline-offset-4"
              >
                {categoryName}
              </Link>
            </>
          );
        })}
      </p>
    </>
  );
};
