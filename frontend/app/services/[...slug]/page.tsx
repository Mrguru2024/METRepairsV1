/* eslint-disable tailwindcss/classnames-order */
import Link from 'next/link';
import { notFound } from 'next/navigation';
import servicesData from '@/data/services.json';
import FAQAccordion from '@/components/FAQAccordion';
import faqsData from '@/data/faqs.json';
import { serviceDetails } from '@/lib/serviceDetails';

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.path.replace('/services/', '').split('/'),
  }));
}

type ServiceParams = Promise<{ slug: string[] }>;
type ServicePageProps = Readonly<{
  params: ServiceParams;
}>;

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const slugPath = slug.join('/');
  const service = servicesData.find((s) => s.path.replace('/services/', '') === slugPath);

  if (!service) {
    notFound();
  }

  const serviceFaqs = faqsData.filter((faq) => {
    const firstWord = service.title.toLowerCase().split(' ')[0];
    return (
      faq.q.toLowerCase().includes(firstWord) ||
      faq.q.toLowerCase().includes(service.title.toLowerCase())
    );
  });

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

  const icon = icons[service.title] || '✨';
  const details = serviceDetails[service.title];

  return (
    <main>
      <section className="container-page py-16">
        <Link href="/services" className="mb-6 inline-block text-sm text-primary hover:opacity-80">
          ← Back to Services
        </Link>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-6 text-5xl">{icon}</div>
            <h1 className="text-4xl font-bold md:text-5xl">{service.title}</h1>
            <p className="mt-4 text-lg opacity-80">{service.summary}</p>

            <div className="mt-8 space-y-6">
              <div>
                <h2 className="text-2xl font-semibold">What We Do</h2>
                <p className="mt-2 opacity-80">
                  {details?.description ||
                    `Our ${service.title.toLowerCase()} services are designed to solve your problems quickly and reliably. We provide professional, licensed, and insured solutions across Metro Atlanta.`}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold">Services We Offer</h2>
                {details?.services ? (
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {details.services.map((s) => (
                      <div
                        key={`${service.path}-${s}`}
                        className="flex items-start gap-2 rounded-md border border-black/5 bg-white/50 p-3 dark:border-white/5 dark:bg-neutral-900/50"
                      >
                        <span className="mt-0.5 text-primary">•</span>
                        <span className="text-sm opacity-90">{s}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="mt-3 space-y-2 opacity-80">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Installation and setup</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Repairs and maintenance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Emergency response</span>
                    </li>
                  </ul>
                )}
              </div>

              {details?.process && (
                <div>
                  <h2 className="text-2xl font-semibold">Our Process</h2>
                  <div className="mt-3 space-y-2">
                    {details.process.map((step, idx) => (
                      <div
                        key={`${service.path}-${step}`}
                        className="flex items-start gap-3 rounded-md border border-primary/10 bg-primary/5 p-3"
                      >
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                          {idx + 1}
                        </span>
                        <span className="text-sm opacity-90">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-lg border border-primary/20 bg-primary/5 p-5 dark:border-primary/30 dark:bg-primary/10">
                <h3 className="flex items-center gap-2 font-semibold">
                  <span className="text-primary">📍</span>
                  <span>Onsite & Private Service</span>
                </h3>
                <p className="mt-2 text-sm opacity-90">
                  All services are performed at your location or in our private workspace. We do not
                  operate a public-facing storefront, ensuring your privacy and convenience.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold">Why Choose Us</h2>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-black/10 bg-white/50 p-4 dark:border-white/10 dark:bg-neutral-900/50">
                    <h3 className="font-semibold">Licensed & Insured</h3>
                    <p className="mt-1 text-sm opacity-70">Fully licensed professionals</p>
                  </div>
                  <div className="rounded-lg border border-black/10 bg-white/50 p-4 dark:border-white/10 dark:bg-neutral-900/50">
                    <h3 className="font-semibold">Fast Response</h3>
                    <p className="mt-1 text-sm opacity-70">Same-day service available</p>
                  </div>
                  <div className="rounded-lg border border-black/10 bg-white/50 p-4 dark:border-white/10 dark:bg-neutral-900/50">
                    <h3 className="font-semibold">Transparent Pricing</h3>
                    <p className="mt-1 text-sm opacity-70">Free estimates, flat-rate quotes</p>
                  </div>
                  <div className="rounded-lg border border-black/10 bg-white/50 p-4 dark:border-white/10 dark:bg-neutral-900/50">
                    <h3 className="font-semibold">Multi-Trade</h3>
                    <p className="mt-1 text-sm opacity-70">One team, multiple services</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-20 rounded-lg border border-black/10 bg-white/80 p-6 backdrop-blur dark:border-white/10 dark:bg-neutral-900/80">
              <h3 className="font-semibold">Get Started</h3>
              <p className="mt-2 text-sm opacity-70">Book service or request a quote today.</p>
              <div className="mt-4 space-y-2">
                <Link
                  href="/booking"
                  className="btn-primary block w-full px-4 py-2.5 text-center text-sm"
                >
                  Book Now
                </Link>
                <Link
                  href="/quote"
                  className="btn-secondary block w-full px-4 py-2.5 text-center text-sm"
                >
                  Get Quote
                </Link>
              </div>
              <div className="mt-6 border-t border-black/10 pt-4 dark:border-white/10">
                <p className="text-xs opacity-60">Serving Metro Atlanta</p>
                <p className="mt-1 text-xs opacity-60">24/7 Emergency Service Available</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {serviceFaqs.length > 0 && (
        <section className="container-page py-12">
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          <div className="mt-6">
            <FAQAccordion items={serviceFaqs} />
          </div>
        </section>
      )}
    </main>
  );
}
