import { Separator } from "@/Components/ui/separator";
import { Link } from "@inertiajs/react";
import { InstagramIcon, MailIcon, TwitterIcon } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Separator className="w-full mt-1" />
      <footer
        ref={footerRef}
        className="flex flex-col md:flex-row bg-[#000] justify-around items-center text-white  h-36"
      >
        <div className="flex items-center">
          <p className="text-3xl font-lobster">Beyinlik.net</p>
        </div>
        <div className="flex gap-5">
          <Link
            href="https://www.instagram.com/e.beyinlik"
            className="flex flex-col items-center gap-2"
          >
            <InstagramIcon size={36} /> <span className="text-lg">Insta</span>
          </Link>
          <Link
            href="https://twitter.com/eBeyinlik"
            className="flex flex-col items-center gap-2"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="w-[36px] pl-1"
              fill="#fff"
            >
              <g>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </g>
            </svg>{" "}
            <span className="text-lg mt-1">Twitter(X)</span>
          </Link>
          <a
            href="mailto:iletisim@beyinlik.com"
            className="flex flex-col items-center gap-2"
          >
            <MailIcon size={36} /> <span className="text-lg">İletişim</span>
          </a>
        </div>
      </footer>
    </>
  );
}
