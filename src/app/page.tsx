import { ArrowDownRight } from "lucide-react";
import Link from "next/link";
import { TicketForm } from "./components/TicketForm";

export default function Home() {
  return (
    <div>
      <main className="bg-aps-200 h-[80vh] w-full rounded-4xl">
        <div>
          <div>
            <p></p>
            <div className="flex">
              <Link href="/">Booking Now</Link>
              <ArrowDownRight className="-rotate-90" />
            </div>
          </div>
          <TicketForm />
        </div>
      </main>
    </div>
  );
}
