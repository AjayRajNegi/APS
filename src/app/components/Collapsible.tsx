import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const services = [
  {
    title: "TROLLEY",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, obcaecati? Maiores totam porro facere, quam explicabo recusandae vero? Enim, aspernatur accusamus expedita laborum quam sapiente dolore fuga labore rerum debitis.",
    imageUrl: `url('/mainImage.png')`,
    imagePosition: "top",
  },
  {
    title: "MEET & ASSIST",
    desc: "First Desc",
    imageUrl: `url('/mainImage.png')`,
    imagePosition: "center",
  },
  {
    title: "LUGGAGE",
    desc: "First Desc",
    imageUrl: `url('/mainImage.png')`,
    imagePosition: "bottom",
  },
  {
    title: "LAUNGE",
    desc: "First Desc",
    imageUrl: `url('/mainImage.png')`,
    imagePosition: "top",
  },
];

export function Collapsible() {
  return (
    <div className="mb-[50px] rounded-4xl border-[10px] border-white">
      <Accordion
        type="single"
        collapsible
        defaultValue="item-1"
        className="rounded-4xl"
      >
        {services.map((service, idx) => (
          <div key={idx}>
            {idx === 0 ? (
              <AccordionItem
                value="item-1"
                className="rounded-t-4xl border-none p-4 pl-16"
                style={{
                  backgroundImage: `${service.imageUrl}`,
                  backgroundPosition: `${service.imagePosition}`,
                }}
              >
                <AccordionTrigger className="flex h-[200px] items-center justify-between text-6xl text-white text-shadow-2xs">
                  {service.title}
                </AccordionTrigger>
                <AccordionContent className="text-xl text-white">
                  {service.desc}
                </AccordionContent>
              </AccordionItem>
            ) : (
              <AccordionItem
                key={idx}
                value={`item-${idx + 1}`}
                className={
                  services.length - 1 === idx
                    ? "rounded-b-4xl border-none p-4 pl-16"
                    : "border-none p-4 pl-16"
                }
                style={{
                  backgroundImage: `${service.imageUrl}`,
                  backgroundPosition: `${service.imagePosition}`,
                }}
              >
                <AccordionTrigger className="flex h-[200px] items-center justify-between text-5xl text-white text-shadow-2xs">
                  {service.title}
                </AccordionTrigger>
                <AccordionContent className="text-xl text-white">
                  {service.desc}
                </AccordionContent>
              </AccordionItem>
            )}
          </div>
        ))}
      </Accordion>
    </div>
  );
}
