"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import TransitForm from "../booking/components/TransitForm";
import DomesticForm from "../booking/components/DomesticForm";
import InternationalForm from "../booking/components/InternationalForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TicketForm() {
  const [activeTab, setActiveTab] = useState("domestic");

  return (
    <div className="w-full max-w-5xl text-black">
      <div className="flex flex-col gap-6 rounded-2xl bg-gray-100 p-4 shadow-xl md:p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Tab Triggers */}
          <TabsList className="flex gap-3 bg-transparent">
            {["domestic", "international", "transit"].map((value) => (
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

          {/* Animate only when switching tabs */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {activeTab === "domestic" && (
                  <TabsContent value="domestic">
                    <DomesticForm />
                  </TabsContent>
                )}
                {activeTab === "international" && (
                  <TabsContent value="international">
                    <InternationalForm />
                  </TabsContent>
                )}
                {activeTab === "transit" && (
                  <TabsContent value="transit">
                    <TransitForm />
                  </TabsContent>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
