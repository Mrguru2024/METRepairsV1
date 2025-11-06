'use client';
import { motion } from 'framer-motion';

export interface Testimonial {
  name: string;
  quote: string;
}

export default function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  return (
    <section className="container-page py-12">
      <motion.div
        className="grid gap-4 md:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {items.map((t, i) => (
          <motion.blockquote
            key={i}
            className="rounded-lg border border-black/5 p-5"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: 'easeOut',
                },
              },
            }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <p className="">"{t.quote}"</p>
            <footer className="mt-2 text-sm opacity-70">— {t.name}</footer>
          </motion.blockquote>
        ))}
      </motion.div>
    </section>
  );
}


