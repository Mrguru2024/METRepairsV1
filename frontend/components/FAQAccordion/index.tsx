export interface FAQItem {
  q: string;
  a: string;
}

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  return (
    <section className="container-page py-12">
      <div className="space-y-3">
        {items.map((it, idx) => (
          <details key={idx} className="rounded-lg border border-black/5 p-5">
            <summary className="cursor-pointer text-sm font-medium">{it.q}</summary>
            <p className="mt-2 text-sm opacity-80">{it.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}


