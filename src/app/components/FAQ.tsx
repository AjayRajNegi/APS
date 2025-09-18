import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ArrowDownRight } from "lucide-react";
import Link from "next/link";

const data = [
  {
    question: "What exactly does an airport porter do?",
    answer:
      "Our certified airport porters provide hands-on luggage assistance to make your travel experience seamless. We meet you at a pre-arranged location, help with your luggage, provide luggage cart or trolley service, and assist you to your check-in counter, departure gate, or from luggage claim to your ground transportation. We handle the heavy lifting so you can focus on your journey. [Learn more about our specific service offerings here].",
  },
  {
    question: "Which Canadian airports do you serve?",
    answer:
      "We provide porter services at all major airports across Canada. This includes Toronto Pearson (YYZ), Vancouver (YVR), Montréal–Trudeau (YUL), Calgary (YYC), and many more. [For a complete list of locations and specific meeting points, visit our Canadian Airports page].",
  },
  {
    question: "How far in advance do I need to book?",
    answer:
      "We recommend booking at least 24-48 hours in advance to guarantee availability. However, we understand travel plans can change, so we do our best to accommodate last-minute requests based on porter availability. [You can check real-time availability and book your service online in just a few minutes].",
  },
  {
    question: "How much does the service cost?",
    answer:
      "Our pricing is transparent and based on the service package and number of bags. A standard service starts at approximately $50-$75 for a single terminal transfer. You will receive a full, all-inclusive quote before you confirm. [For a detailed breakdown, see our transparent Pricing page].",
  },
  {
    question: "Where will we meet at the airport?",
    answer:
      "For arrivals, your porter will meet you at a specific, easy-to-find location like inside the baggage claim hall. For departures, we typically meet at the curbside drop-off area. After you book, you will receive a detailed confirmation with exact instructions and a map. [Specific meeting points for each airport are listed on our Canadian Airports page].",
  },
  {
    question:
      "Is this service suitable for seniors or passengers with reduced mobility?",
    answer:
      "Absolutely. Providing compassionate airport assistance for elderly passengers and those with special needs is a core part of our service. Our porters are trained to be patient and offer supportive care. [Explore our dedicated Special Assistance service page to learn more].",
  },
  {
    question: "What is your cancellation or change policy?",
    answer:
      "We offer a flexible cancellation policy. You can cancel or reschedule your booking free of charge up to 12 hours before your scheduled meeting time. For last-minute cancellations due to flight changes, please contact our 24/7 support line immediately. [Full details of our policy are available in our Terms of Service].",
  },
  {
    question: "Are your porters certified and background-checked?",
    answer:
      "Yes. Every member of our team undergoes a rigorous vetting process, including a background check, and is trained in customer service and airport safety protocols. [Read about our commitment to quality and safety on our About Us page].",
  },
  {
    question: "Can I book a porter for a group or family?",
    answer:
      "Certainly! We frequently assist large families and groups. When booking, simply select the number of people and bags in your party. [For large group quotes or special arrangements, please contact our support team directly].",
  },
  {
    question:
      "Do you offer services like Meet & Greet or VIP executive services?",
    answer:
      "Yes, we do. Beyond standard porter services, we offer premium options including Meet and Greet service and VIP executive services. [Discover our premium service tiers and their benefits on our Services overview page].",
  },
];

export function FAQ() {
  return (
    <section>
      {/* Section 1 */}
      <article>
        <div className="mt-[0px] flex justify-between">
          <p className="text-6xl font-[500]">
            Frequently <br /> Asked Questions
          </p>
          <div>
            <div className="mt-4 mb-[10px] flex w-fit items-center">
              <Link
                href="/"
                className="bg-aps-secondary-300 rounded-full px-3 py-2 text-white shadow-2xl"
              >
                Booking Now
              </Link>

              <ArrowDownRight
                className="bg-aps-secondary-300 -z-0 -rotate-90 rounded-full p-1 text-white"
                size={30}
              />
            </div>
            <p className="w-fit">
              This guide explains how APS <br /> meets your daily flight needs.
            </p>
          </div>
        </div>
      </article>
      {/* Accordian */}
      <article className="mx-auto my-[40px] w-[40%]">
        <Accordion
          type="single"
          collapsible
          className="w-full rounded-4xl border-[1px] border-black p-8 shadow-[5px_5px_0px_0px_rgba(1,1,1)]"
          defaultValue="item-1"
        >
          {data.map((data, idx) => (
            <AccordionItem
              value={`${idx === 0 ? "item-1" : `item-${idx + 1}`}`}
              key={idx}
            >
              <AccordionTrigger className="text-xl">
                {data.question}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                {data.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </article>
    </section>
  );
}
