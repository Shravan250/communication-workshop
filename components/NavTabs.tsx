import Link from "next/link";
import { Button } from "./ui/button";

const tabs = [
  { name: "Email", href: "/" },
  { name: "Timed", href: "/timed" },
  { name: "Vocabulary", href: "/vocabulary" },
];

export default function NavTabs() {
  return (
    <nav className="flex items-center justify-center w-full p-4 my-2">
      {tabs.map((tab) => (
        <Link key={tab.name} href={tab.href}>
          <Button
            size="lg"
            variant="outline"
            className="bg-gray-700 text-white mx-2"
          >
            {tab.name}
          </Button>
        </Link>
      ))}
    </nav>
  );
}
