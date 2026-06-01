import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const Loading = () => {
  return (
    <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <Card
          key={index}
          className="overflow-hidden rounded-2xl"
        >
          {/* Image */}
          <div className="h-[250px] bg-muted p-4">
            <Skeleton className="h-full w-full rounded-lg" />
          </div>

          <CardContent className="space-y-3 p-4">
            {/* Category */}
            <Skeleton className="h-5 w-24 rounded-full" />

            {/* Title */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-20" />
            </div>
          </CardContent>

          <CardFooter className="flex items-center justify-between p-4 pt-0">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-10 w-28 rounded-xl" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Loading;