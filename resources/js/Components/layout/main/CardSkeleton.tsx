import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
  Card as CardShadcn,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Skeleton } from "@/Components/ui/skeleton";

export const CardSkeleton = () => {
  return (
    <CardShadcn className="w-[350px] flex flex-col justify-between hover:drop-shadow-xl transition-all">
      <div>
        <CardHeader>
          <Skeleton className="pb-6 w-full h-52" />
          <CardTitle className="flex flex-col justify-between">
            <Skeleton className=" w-full h-7 my-1" />
            <Skeleton className=" w-full h-7 my-1" />
            <Skeleton className=" w-full h-7 my-1" />
          </CardTitle>
          <CardDescription className="flex justify-between">
            <Skeleton className=" w-12 h-6" />

            <span>
              <Skeleton className=" w-24 h-6" />
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="py-1 flex-wrap whitespace-pre-wrap">
          <Skeleton className=" w-full h-25" />
        </CardContent>
      </div>
      <CardFooter className="flex  justify-end ">
        <Button asChild>
          <Skeleton className="w-24 h-9" />
        </Button>
      </CardFooter>
    </CardShadcn>
  );
};
