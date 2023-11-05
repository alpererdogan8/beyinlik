import { Button, ButtonProps } from "@/Components/ui/button";
import { VariantProps } from "class-variance-authority";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { ButtonHTMLAttributes } from "react";

export const ThemeButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      {...props}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
};
