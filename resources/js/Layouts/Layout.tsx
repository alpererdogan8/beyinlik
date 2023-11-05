import Footer from "@/Components/layout/footer/Footer";
import { Navigation } from "@/Components/layout/header/Navigation";
import { ThemeProvider } from "@/Components/theme/ThemeProvider";
import { PropsWithChildren } from "react";

export default function GuestLayout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class" enableSystem>
      <Navigation />
      <div className="w-full flex flex-col items-center justify-center  h-auto">
        {children}
      </div>
      <Footer />
    </ThemeProvider>
  );
}
