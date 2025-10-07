"use client";
import TransitForm from "./components/TransitForm";
import DomesticForm from "./components/DomesticForm";
import InternationalForm from "./components/InternationalForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function BookingPage() {
  return (
    <div className="mx-auto max-w-3xl p-6">
      <Tabs defaultValue="domestic">
        <TabsList>
          <TabsTrigger value="domestic">Domestic</TabsTrigger>
          <TabsTrigger value="international">International</TabsTrigger>
          <TabsTrigger value="transit">Transit</TabsTrigger>
        </TabsList>

        <TabsContent value="domestic">
          <DomesticForm />
        </TabsContent>
        <TabsContent value="international">
          <InternationalForm />
        </TabsContent>
        <TabsContent value="transit">
          <TransitForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
