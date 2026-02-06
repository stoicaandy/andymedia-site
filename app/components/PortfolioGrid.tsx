import PortfolioCard, { PortfolioItem } from "./PortfolioCard";

export default function PortfolioGrid({
  items,
}: {
  items: PortfolioItem[];
}) {
  return (
    <div className="grid gap-6 md:gap-8 md:grid-cols-2">
      {items.map((item) => (
        <PortfolioCard key={item.slug} item={item} />
      ))}
    </div>
  );
}
