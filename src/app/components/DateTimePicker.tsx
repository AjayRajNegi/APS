"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
const DateTimePicker = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("12:00");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-2">
        {/* Calendar + Date */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-2 focus:outline-none">
              <CalendarIcon size={18} className="text-gray-500" />
              <span className="text-sm">
                {date
                  ? date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  : new Date(Date.now()).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => {
                setDate(d);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>

        {/* Clock + Time */}
        <div className="flex items-center gap-1">
          <Clock size={22} className="text-gray-500" />
          <Input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="rentalForm h-auto border-0 p-0 text-sm shadow-none focus-visible:ring-0"
          />
        </div>
      </div>
    </div>
  );
};

export default DateTimePicker;
