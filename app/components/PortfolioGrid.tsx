// app/components/PortfolioGrid.tsx

import PortfolioCard from "@/app/components/PortfolioCard";
import type { PortfolioItem } from "@/app/data/portfolio";

export default function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  return (
    <section className="mt-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {items.map((item) => (
          <PortfolioCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
