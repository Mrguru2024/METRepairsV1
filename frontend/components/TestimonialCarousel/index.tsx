'use client';
import { motion, type Transition, type Variants } from 'framer-motion';

export interface Testimonial {
  name: string;
  quote: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemTransition = {
  duration: 0.5,
  ease: 'easeOut',
} satisfies Transition;

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...itemTransition,
    },
  },
};

export default function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  return (
    <section className="container-page py-12">
      <motion.div
        className="grid gap-4 md:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={containerVariants}
      >
        {items.map((t) => (
          <motion.blockquote
            key={`${t.name}-${t.quote.slice(0, 20)}`}
            className="rounded-lg border border-black/5 p-5"
            variants={itemVariants}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <p className="">&ldquo;{t.quote}&rdquo;</p>
            <footer className="mt-2 text-sm opacity-70">— {t.name}</footer>
          </motion.blockquote>
        ))}
      </motion.div>
    </section>
  );
}


