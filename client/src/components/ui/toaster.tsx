import * as React from "react";
import { cn } from "@/lib/utils";

interface ToastProps {
  description: string | number;
  action?: React.ReactNode;
}

const Toast = ({ description, action }: ToastProps) => {
  return (
    <div className={cn("p-4 rounded-md shadow-md bg-white")}>
      <div>{description}</div>
      {action && <div>{action}</div>}
    </div>
  );
};

export { Toast };
