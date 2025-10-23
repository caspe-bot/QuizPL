import * as React from "react";
import { Button, buttonVariants } from "./button";
import { cn } from "@/lib/utils";

interface CalendarProps {
  selectedDate: Date | null;
  onSelect: (date: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onSelect,
}) => {
  // prosty placeholder kalendarza
  return (
    <div className="calendar">
      <Button onClick={() => onSelect(new Date())}>Dzisiaj</Button>
    </div>
  );
};
