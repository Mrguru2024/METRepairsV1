import HeroSection from '@/components/HeroSection';
import ServiceCardGrid from '@/components/ServiceCardGrid';
import PricingDepositCallout from '@/components/PricingDepositCallout';
import StepsProcessTimeline from '@/components/StepsProcessTimeline';
import TestimonialCarousel from '@/components/TestimonialCarousel';

const services = [
  { title: 'Locksmithing', href: '/services/locksmithing', description: 'Rekeys, smart locks, emergency lockouts.' },
  { title: 'Electrical', href: '/services/electrical', description: 'Panels, lighting, EV chargers, troubleshooting.' },
  { title: 'Access Control', href: '/services/access-control', description: 'Keypads, card readers, intercoms, door strikes.' },
  { title: 'Security Systems', href: '/services/security-systems', description: 'CCTV, NVRs, alarms, monitoring-ready.' },
  { title: 'Fire Alarm', href: '/services/fire-alarm', description: 'Detectors, pull stations, inspection-ready installs.' },
  { title: 'Data/Low Voltage', href: '/services/data-low-voltage', description: 'Cat6, racks, patch panels, Wi‑Fi coverage.' },
  { title: 'TV Mounting', href: '/services/tv-mounting', description: 'Hidden wires, soundbars, secure mounts.' },
  { title: 'Electronic Repairs', href: '/services/electronic-repairs', description: 'Boards, soldering, diagnostics.' },
];

const testimonials = [
  { name: 'A. Johnson', quote: 'Fast response and clean install. Highly recommend.' },
  { name: 'R. Patel', quote: 'Solved our access control issues same day.' },
  { name: 'K. Lee', quote: 'Transparent pricing and great communication.' },
];

export default function HomePage() {
  return (
    <main>
      <div className="bg-gradient-to-b from-primary/10 via-neutral_light to-neutral_light dark:from-primary/20 dark:via-neutral_dark dark:to-neutral_dark">
        <HeroSection
          headline="One trusted team for Locksmithing, Electrical, and Systems"
          subcopy="Book service, request a quote, or get help now across Metro Atlanta."
          primaryHref="/booking"
          secondaryHref="/quote"
        />
      </div>
      <ServiceCardGrid items={services} />
      <PricingDepositCallout />
      <StepsProcessTimeline />
      <TestimonialCarousel items={testimonials} />
    </main>
  );
}

