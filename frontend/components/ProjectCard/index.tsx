'use client';
import { motion } from 'framer-motion';

export interface ProjectCardProps {
  title: string;
  outcome: string;
  index?: number;
}

export default function ProjectCard({ title, outcome, index = 0 }: ProjectCardProps) {
  return (
    <motion.article
      className="rounded-lg border border-black/5 p-5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: 'easeOut',
      }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <div className="aspect-video rounded bg-neutral-200 dark:bg-neutral-800" />
      <h3 className="mt-3 text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm opacity-70">{outcome}</p>
    </motion.article>
  );
}


