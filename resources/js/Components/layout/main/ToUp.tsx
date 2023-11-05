import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
const handleTopScroll = () => {
  window.scrollBy({ top: -window.scrollY, behavior: "smooth" });
};

export const ToUp = () => {
  const [isVisible, setIsVisible] = useState(false);
  console.log(isVisible);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={handleTopScroll}
      className={`scroll-to-top ${
        !isVisible ? "hidden" : "flex"
      } bg-black dark:bg-zinc-500 text-white p-5 rounded-full flex justify-center items-center fixed bottom-10 right-10`}
    >
      <ChevronUp />
    </button>
  );
};
