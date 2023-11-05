import { Link, usePage } from "@inertiajs/react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../../ui/navigation-menu";
import { Button } from "../../ui/button";
import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import { useEffect, useRef } from "react";
import { ThemeButton } from "./ThemeButton";
import { Separator } from "@/Components/ui/separator";

export function Navigation() {
  const { props } = usePage();

  const { categories } = props.data as any;
  const navbarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 80;
      if (navbarRef.current) {
        navbarRef.current.classList.toggle("fixed", scrolled);
        navbarRef.current.classList.toggle("shadow-sm", scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      ref={navbarRef}
      className="w-full z-50 top-0 transition-transform duration-300 ease-in-out transform translate-y-100 backdrop-filter  backdrop-blur-md bg-white bg-opacity-50 dark:bg-opacity-50 dark:bg-slate-950  px-5 flex justify-between items-center h-20"
    >
      <Link
        className="font-lobster w-[118.547px] group flex flex-col-reverse justify-between items-center text-4xl"
        href="/"
      >
        <img
          className="w-24 hidden group-hover:block"
          src="/images/beyinlik-saydam.webp"
          alt="beyinlik-logo"
        />
        <span className=" group-hover:hidden">Beyinlik</span>
      </Link>
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList className="flex-wrap">
          {categories?.map((item: any) => {
            return (
              <NavigationMenuItem key={item.id}>
                <Button className="p-1 lg:p-2" variant={"link"}>
                  <Link
                    className="lg:text-lg"
                    href={route("kategori", { id: item.slug })}
                  >
                    {item.name}
                  </Link>
                </Button>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
      <div>
        <ThemeButton className="hidden md:flex" />
        <Sheet>
          <SheetTrigger className="md:hidden">
            <Button>
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col justify-between">
            <SheetHeader>
              <SheetTitle className="text-left font-bold text-3xl ml-3">
                Kategoriler
              </SheetTitle>
              <SheetDescription className="text-left">
                {categories?.map((item: any) => {
                  return (
                    <NavigationMenuItem key={item.id} className="list-none">
                      <Button variant={"link"}>
                        <Link
                          className="font-bold text-2xl"
                          href={route("kategori", { id: item.slug })}
                        >
                          {item.name}
                        </Link>
                      </Button>
                    </NavigationMenuItem>
                  );
                })}
              </SheetDescription>
            </SheetHeader>
            <SheetFooter>
              <ThemeButton className="" />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
