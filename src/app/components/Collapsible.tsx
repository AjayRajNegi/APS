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
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, obcaecati? Maiores totam porro facere, quam explicabo recusandae vero? Enim, aspernatur accusamus expedita laborum quam sapiente dolore fuga labore rerum debitis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores fuga necessitatibus maxime quod consectetur rem, officia quas harum dignissimos, ut ducimus cumque quos nesciunt consequuntur cupiditate nemo minus itaque soluta?",
    imageUrl: `url('/mainImage.png')`,
    imagePosition: "bottom",
  },
  {
    title: "MEET & ASSIST",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, obcaecati? Maiores totam porro facere, quam explicabo recusandae vero? Enim, aspernatur accusamus expedita laborum quam sapiente dolore fuga labore rerum debitis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores fuga necessitatibus maxime quod consectetur rem, officia quas harum dignissimos, ut ducimus cumque quos nesciunt consequuntur cupiditate nemo minus itaque soluta?",
    imageUrl: `url('/mainImage.png')`,
    imagePosition: "top",
  },
  {
    title: "LUGGAGE",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, obcaecati? Maiores totam porro facere, quam explicabo recusandae vero? Enim, aspernatur accusamus expedita laborum quam sapiente dolore fuga labore rerum debitis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores fuga necessitatibus maxime quod consectetur rem, officia quas harum dignissimos, ut ducimus cumque quos nesciunt consequuntur cupiditate nemo minus itaque soluta?",
    imageUrl: `url('/mainImage.png')`,
    imagePosition: "center",
  },
  {
    title: "LAUNGE",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, obcaecati? Maiores totam porro facere, quam explicabo recusandae vero? Enim, aspernatur accusamus expedita laborum quam sapiente dolore fuga labore rerum debitis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores fuga necessitatibus maxime quod consectetur rem, officia quas harum dignissimos, ut ducimus cumque quos nesciunt consequuntur cupiditate nemo minus itaque soluta?",
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
