'use client';
import { motion } from 'framer-motion';

export interface ServiceItem {
  title: string;
  href: string;
  description: string;
  icon?: string;
}

export interface ServiceCardGridProps {
  items: ServiceItem[];
}

const icons: Record<string, string> = {
  Locksmithing: '🔐',
  Electrical: '⚡',
  'Access Control': '🚪',
  'Security Systems': '📹',
  'Fire Alarm': '🔥',
  'Data/Low Voltage': '🔌',
  'TV Mounting': '📺',
  'Electronic Repairs': '🔧',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function ServiceCardGrid({ items }: ServiceCardGridProps) {
  return (
    <section className="container-page py-12">
      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {items.map((item, index) => {
          const icon = item.icon || icons[item.title] || '✨';
          return (
            <motion.a
              key={item.href}
              href={item.href}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-lg border border-black/10 bg-white p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 dark:border-white/10 dark:bg-neutral-900 dark:hover:border-primary/40"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="mb-3 text-3xl">{icon}</div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">{item.title}</h3>
                <p className="mt-2 text-sm opacity-70">{item.description}</p>
                <span className="mt-4 inline-block text-xs font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Learn more →
                </span>
              </div>
            </motion.a>
          );
        })}
      </motion.div>
    </section>
  );
}


