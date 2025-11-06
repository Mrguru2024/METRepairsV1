export interface Testimonial {
  name: string;
  quote: string;
}

export default function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  return (
    <section className="container-page py-12">
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((t, i) => (
          <blockquote key={i} className="rounded-lg border border-black/5 p-5">
            <p className="">“{t.quote}”</p>
            <footer className="mt-2 text-sm opacity-70">— {t.name}</footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}


