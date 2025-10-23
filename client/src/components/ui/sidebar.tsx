import * as React from "react";
import { Slot, type SlotProps } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface SidebarProps extends SlotProps {
  children?: React.ReactNode;
  className?: string;
}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Slot ref={ref} className={cn("p-2", className)} {...props}>
        {children as React.ReactNode} {/* ✅ rzutowanie typu */}
      </Slot>
    );
  },
);

Sidebar.displayName = "Sidebar";
