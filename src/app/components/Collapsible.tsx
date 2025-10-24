import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDownIcon } from "lucide-react";

const services = [
  {
    title: "TROLLEY",
    desc: "Traveling with heavy luggage can be stressful, but our trolley service makes it effortless. Our trained porters will handle your bags, wheel them through the airport, and ensure they reach your check-in or gate safely. From arrivals to departures, enjoy a smooth, hands-free experience so you can focus on your journey.",
    imageUrl: `url('/mainImage.png')`,
    imagePosition: "bottom",
  },
  {
    title: "MEET & ASSIST",
    desc: "Skip the airport stress with our personalized Meet & Assist service. A professional porter will greet you at the terminal, guide you through check-in, security, and immigration, and even help you with lounge access if needed. Perfect for first-time travelers, business trips, or anyone looking for a seamless airport experience.",
    imageUrl: `url('/mainImage.png')`,
    imagePosition: "top",
  },
  {
    title: "LUGGAGE",
    desc: "Say goodbye to the hassle of managing multiple bags. Our luggage assistance service covers carrying, transferring, and organizing your bags with care. Whether you're connecting flights, arriving, or departing, our porters ensure your belongings are safe, secure, and delivered right to your destination.",
    imageUrl: `url('/mainImage.png')`,
    imagePosition: "center",
  },
  {
    title: "LAUNGE",
    desc: "Relax in style with our lounge access service. While our porters handle your luggage and airport navigation, you can unwind in comfort, enjoy refreshments, and catch up on work or rest before your flight. Combine convenience and luxury for a truly stress-free airport experience.",
    imageUrl: `url('/mainImage.png')`,
    imagePosition: "top",
  },
];

export function Collapsible() {
  return (
    <div className="mb-[50px] box-border w-full rounded-4xl border-[10px] border-white">
      <Accordion
        type="single"
        collapsible
        defaultValue="item-1"
        className="w-full rounded-4xl"
      >
        {services.map((service, idx) => (
          <div key={idx}>
            <AccordionItem
              value={`item-${idx + 1}`}
              className={`${idx === 0 ? "rounded-t-4xl" : ""} ${idx === services.length - 1 ? "rounded-b-4xl" : ""} w-full border-none p-4 pl-4 md:pl-10 lg:pl-16`}
              style={{
                backgroundImage: `${service.imageUrl}`,
                backgroundPosition: `${service.imagePosition}`,
              }}
            >
              <AccordionTrigger className="flex h-[200px] items-center justify-between text-5xl text-white text-shadow-2xs">
                {service.title}
                <ChevronDownIcon
                  className="pointer-events-none shrink-0 translate-y-0.5 rounded-full bg-white p-1 text-black transition-transform duration-200"
                  size={40}
                />
              </AccordionTrigger>
              <AccordionContent className="text-xl text-white">
                {service.desc}
              </AccordionContent>
            </AccordionItem>
          </div>
        ))}
      </Accordion>
    </div>
  );
}
