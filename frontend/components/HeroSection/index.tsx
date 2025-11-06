export interface HeroSectionProps {
  headline: string;
  subcopy: string;
  primaryHref: string;
  secondaryHref: string;
}

export default function HeroSection({
  headline,
  subcopy,
  primaryHref,
  secondaryHref,
}: HeroSectionProps) {
  return (
    <section className="container-page py-16">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold md:text-5xl">{headline}</h1>
          <p className="mt-3 text-lg opacity-80">{subcopy}</p>
          <div className="mt-6 flex gap-3">
            <a href={primaryHref} className="btn-primary px-5 py-3">
              Book Now
            </a>
            <a href={secondaryHref} className="btn-secondary px-5 py-3">
              Get a Quote
            </a>
          </div>
        </div>
        <div className="aspect-video rounded-lg overflow-hidden bg-neutral-900">
          <video
            src="/images/brand/video/MET.mp4"
            autoPlay
            loop
            controls
            playsInline
            className="h-full w-full object-cover"
            aria-label="MET Repairs services video"
          />
        </div>
      </div>
    </section>
  );
}


