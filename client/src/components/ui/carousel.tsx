import * as React from "react";
import { Button, ButtonProps } from "./button";
import { cn } from "@/lib/utils";

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("carousel flex overflow-x-auto", className)} {...props}>
        {children}
      </div>
    );
  }
);

Carousel.displayName = "Carousel";

export { Button, type ButtonProps };

