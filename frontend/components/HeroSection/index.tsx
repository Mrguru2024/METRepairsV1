'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export interface HeroSectionProps {
  headline: string;
  subcopy: string;
  primaryHref: string;
  secondaryHref: string;
}

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const videoVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      delay: 0.2,
    },
  },
};

export default function HeroSection({
  headline,
  subcopy,
  primaryHref,
  secondaryHref,
}: HeroSectionProps) {
  return (
    <section className="container-page py-16">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-4xl font-bold md:text-5xl">{headline}</h1>
          <motion.p
            className="mt-3 text-lg opacity-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {subcopy}
          </motion.p>
          <motion.div
            className="mt-6 flex gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Link href={primaryHref} className="btn-primary px-5 py-3">
              Book Now
            </Link>
            <Link href={secondaryHref} className="btn-secondary px-5 py-3">
              Get a Quote
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          className="aspect-video rounded-lg overflow-hidden bg-neutral-900"
          variants={videoVariants}
          initial="hidden"
          animate="visible"
        >
          <video
            src="/images/brand/video/MET.mp4"
            autoPlay
            loop
            controls
            playsInline
            className="h-full w-full object-cover"
            aria-label="MET Repairs services video"
          />
        </motion.div>
      </div>
    </section>
  );
}


