import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, ...props }, ref) => {
    return (
      <nav ref={ref} className={className} {...props}>
        {/* przykładowe breadcrumb buttons */}
        <Button variant="outline" size="sm">
          Home
        </Button>
        <Button variant="outline" size="sm">
          Quiz
        </Button>
      </nav>
    );
  },
);

Breadcrumb.displayName = "Breadcrumb";
