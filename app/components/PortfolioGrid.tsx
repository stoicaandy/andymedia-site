import PortfolioCard from "./PortfolioCard";
import type { PortfolioItem } from "@/app/data/portfolio";

export default function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  return (
    <div className="grid gap-6 md:gap-7 md:grid-cols-2">
      {items.map((it) => (
        <PortfolioCard key={it.slug} item={it} />
      ))}
    </div>
  );
}
