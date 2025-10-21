"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  serviceType: string;
  pickupLocation: string;
  dropLocation: string;
  pickupDate: string;
  carType: string;
};

export default function Demo() {
  const [activeTab, setActiveTab] = useState("");
  const form = useForm<FormValues>();
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = () => {};

  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        {/* Tab Triggers */}
        <TabsList className="flex gap-3 bg-transparent">
          {["Airport Transfer"].map((value) => (
            <TabsTrigger
              key={value}
              value={value}
              className={cn(
                "rounded-full border border-transparent px-4 py-2 text-sm font-medium shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-all duration-300 hover:scale-95 hover:shadow-none",
                "data-[state=active]:bg-aps-secondary-400 data-[state=active]:text-white",
                "data-[state=inactive]:bg-aps-secondary-200 data-[state=inactive]:text-gray-700",
              )}
            >
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="Airport Transfer">
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="my-10 grid grid-cols-5 gap-4"
            >
              {/* Service Type */}
              <FormField
                control={control}
                name="serviceType"
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormControl>
                      <Select defaultValue={field.value}>
                        <SelectTrigger className="w-full min-w-0 rounded-full border-none bg-white px-4 py-2 shadow-[0_0_0_1px_rgba(0,0,0,0.15)] focus:outline-none active:outline-none">
                          <SelectValue placeholder="Service Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="from">From</SelectItem>
                          <SelectItem value="to">To</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Pickup Location */}
              <FormField
                control={control}
                name="pickupLocation"
                rules={{ required: true }}
                render={() => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter Pickup Location"
                        className="w-full rounded-full border-none bg-white px-4 py-2 shadow-[0_0_0_1px_rgba(0,0,0,0.15)] focus:outline-none active:outline-none"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Drop Location */}
              <FormField
                control={control}
                name="dropLocation"
                rules={{ required: true }}
                render={() => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter Pickup Location"
                        className="w-full rounded-full border-none bg-white px-4 py-2 shadow-[0_0_0_1px_rgba(0,0,0,0.15)] focus:outline-none active:outline-none"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Travel Date */}
              <FormField
                control={control}
                name="pickupDate"
                rules={{
                  required: "Please select a date",
                  validate: (value) =>
                    value && new Date(value) > new Date()
                      ? true
                      : "Select a future date",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full rounded-2xl rounded-full border-none bg-white px-4 py-2 pl-3 text-left font-normal shadow-[0_0_0_1px_rgba(0,0,0,0.15)] focus:outline-none active:outline-none",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(new Date(field.value), "PPP")
                              ) : (
                                <span>Select date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) => {
                              if (date) field.onChange(date.toISOString());
                            }}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </>
  );
}
