'use client';
/* eslint-disable tailwindcss/classnames-order */
declare const process: {
  env: Record<string, string | undefined>;
};
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { QuoteSchema, type QuoteInput } from '@/lib/validation/quote';
import { useToast } from '@/lib/toast';
import { cn } from '@/lib/utils';

const quickFacts = [
  { title: '24 hr scheduling', description: 'Most quotes scheduled within a day of inquiry.' },
  {
    title: 'Metro-wide coverage',
    description: 'Serving Atlanta, Cobb, Gwinnett, and neighboring counties.',
  },
  {
    title: 'Licensed techs',
    description: 'Certified locksmiths, electricians, and low voltage specialists.',
  },
];

const budgetOptions = [
  { value: 'UNDER_1K', label: 'Under $1,000' },
  { value: '1K_5K', label: '$1,000 - $5,000' },
  { value: '5K_15K', label: '$5,000 - $15,000' },
  { value: '15K_PLUS', label: '$15,000+' },
];

const preferredTimeOptions = [
  { value: 'MORNING', label: 'Morning (8a - 11a)' },
  { value: 'MIDDAY', label: 'Midday (11a - 2p)' },
  { value: 'AFTERNOON', label: 'Afternoon (2p - 5p)' },
  { value: 'EVENING', label: 'Evening (after 5p)' },
];

const processSteps = [
  {
    title: 'Share your project vision',
    description: 'Tell us what you need, upload photos or spec sheets, and include timelines.',
  },
  {
    title: 'Collaborate on scope',
    description: 'Our team reviews details, asks clarifying questions, and aligns on deliverables.',
  },
  {
    title: 'Receive a precise quote',
    description: 'Get transparent pricing, lead times, and next steps delivered to your inbox.',
  },
];

export default function QuotePage() {
  const { setMsg, Toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuoteInput & { attachments?: FileList }>({
    resolver: zodResolver(QuoteSchema),
  });

  const inputClass =
    'mt-2 block w-full rounded-2xl border border-slate-200/60 bg-white/90 px-4 py-3 text-sm text-slate-900 shadow-sm ring-offset-2 ring-offset-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 placeholder:text-slate-500 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-100 dark:placeholder:text-slate-400 dark:ring-offset-slate-950';

  async function onSubmit(data: QuoteInput & { attachments?: FileList }) {
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        if (key === 'attachments' || value == null) continue;
        if (typeof value === 'string') {
          formData.append(key, value);
        }
      }

      if (data.attachments && data.attachments.length > 0) {
        for (const file of Array.from(data.attachments)) {
          formData.append('attachments', file);
        }
      }

      const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const res = await fetch(base + '/api/quote', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Submission failed');
      }

      setMsg('Submitted. We will contact you shortly.');
      reset();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Quote submission failed', error);
      setMsg('Submission failed. Please try again.');
    }
  }

  const pageBackgroundClass = cn(
    'relative isolate overflow-hidden',
    'bg-neutral_light text-slate-900',
    'dark:bg-neutral_dark dark:text-slate-100'
  );
  const heroGlowClass = cn(
    'absolute left-1/2 -top-40 -translate-x-1/2 pointer-events-none',
    'size-[520px] rounded-full bg-primary/20 blur-3xl',
    'dark:bg-primary/15'
  );
  const heroGradientClass = cn(
    'absolute right-0 inset-y-0 pointer-events-none',
    'h-full w-1/2 bg-gradient-to-bl from-primary/10 via-transparent to-transparent',
    'dark:from-primary/20'
  );
  const sectionWrapperClass = cn(
    'container-page relative flex flex-col gap-14 py-16',
    'lg:py-24 lg:gap-20'
  );

  return (
    <main className={pageBackgroundClass}>
      <div aria-hidden className={heroGlowClass} />
      <div aria-hidden className={heroGradientClass} />
      <section className={sectionWrapperClass}>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)] lg:items-start">
          <div className="space-y-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-sm font-medium text-primary dark:border-primary/40 dark:bg-primary/15 dark:text-primary">
              Request a detailed project proposal
            </span>
            <div className="space-y-6">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Launch your project with confidence
              </h1>
              <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-300">
                Our specialists span locksmithing, electrical, low voltage, and security systems.
                Share your scope and we&apos;ll send a tailored quote with materials, scheduling,
                and transparent pricing — usually within 24 hours.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {quickFacts.map((fact) => (
                <div
                  key={fact.title}
                  className="rounded-3xl border border-slate-200/60 bg-white/80 p-5 shadow-lg shadow-primary/5 backdrop-blur-sm dark:border-white/10 dark:bg-slate-900/60"
                >
                  <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                    {fact.title}
                  </h2>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    {fact.description}
                  </p>
                </div>
              ))}
              <div className="rounded-3xl border border-slate-200/60 bg-white/80 p-5 shadow-lg shadow-primary/5 backdrop-blur-sm dark:border-white/10 dark:bg-slate-900/60">
                <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                  Talk to a coordinator
                </h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Prefer the phone? Call{' '}
                  <span className="font-semibold text-primary">404-555-0136</span> weekdays 8a — 6p.
                </p>
              </div>
            </div>
            <div className="grid gap-6 rounded-3xl border border-slate-200/60 bg-white/80 p-8 shadow-xl shadow-primary/5 backdrop-blur-sm dark:border-white/10 dark:bg-slate-900/60">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                What happens after you submit
              </h2>
              <div className="grid gap-6 sm:grid-cols-3">
                {processSteps.map((step, index) => (
                  <div key={step.title} className="flex flex-col gap-3">
                    <span className="inline-flex size-10 items-center justify-center rounded-full bg-primary/10 text-base font-semibold text-primary ring-1 ring-primary/20 dark:bg-primary/15 dark:text-primary-foreground dark:ring-primary/25">
                      {index + 1}
                    </span>
                    <div className="space-y-1.5">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {step.title}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-primary/15 via-white/40 to-secondary/20 blur-2xl dark:from-primary/10 dark:via-white/5 dark:to-secondary/10" />
            <div className="rounded-[2rem] border border-white/60 bg-white/95 p-8 shadow-2xl shadow-primary/10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
              <header className="mb-8 space-y-2 text-center">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                  Tell us about your project
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Detailed information helps us deliver accurate pricing faster.
                </p>
              </header>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" autoComplete="off">
                <div>
                  <label
                    className="text-sm font-medium text-slate-700 dark:text-slate-200"
                    htmlFor="name"
                  >
                    Full name
                  </label>
                  <input
                    id="name"
                    {...register('name')}
                    placeholder="Jordan Mitchell"
                    className={inputClass}
                    suppressHydrationWarning
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      className="text-sm font-medium text-slate-700 dark:text-slate-200"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      {...register('email')}
                      type="email"
                      placeholder="you@company.com"
                      className={inputClass}
                    suppressHydrationWarning
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <label
                      className="text-sm font-medium text-slate-700 dark:text-slate-200"
                      htmlFor="phone"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      {...register('phone')}
                      placeholder="(404) 555-0136"
                      className={inputClass}
                    suppressHydrationWarning
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    className="text-sm font-medium text-slate-700 dark:text-slate-200"
                    htmlFor="service"
                  >
                    Service needed
                  </label>
                <select id="service" {...register('service')} className={inputClass} suppressHydrationWarning>
                    <option value="">Select service</option>
                    <option value="LOCKSMITHING">Locksmithing</option>
                    <option value="ELECTRICAL">Electrical</option>
                    <option value="ACCESS_CONTROL">Access Control</option>
                    <option value="SECURITY_SYSTEMS">Security Systems</option>
                    <option value="FIRE_ALARM">Fire Alarm</option>
                    <option value="DATA_LOW_VOLTAGE">Data/Low Voltage</option>
                    <option value="TV_MOUNTING">TV Mounting</option>
                    <option value="ELECTRONIC_REPAIRS">Electronic Repairs</option>
                  </select>
                  {errors.service && (
                    <p className="mt-1 text-sm text-destructive">{errors.service.message}</p>
                  )}
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      className="text-sm font-medium text-slate-700 dark:text-slate-200"
                      htmlFor="address"
                    >
                      Project address
                    </label>
                    <input
                      id="address"
                      {...register('address')}
                      placeholder="Street, Suite"
                      className={inputClass}
                    suppressHydrationWarning
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-destructive">{errors.address.message}</p>
                    )}
                  </div>
                  <div>
                    <label
                      className="text-sm font-medium text-slate-700 dark:text-slate-200"
                      htmlFor="zip"
                    >
                      ZIP code
                    </label>
                    <input
                      id="zip"
                      {...register('zip')}
                      placeholder="30303"
                      className={inputClass}
                    suppressHydrationWarning
                    />
                    {errors.zip && (
                      <p className="mt-1 text-sm text-destructive">{errors.zip.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    className="text-sm font-medium text-slate-700 dark:text-slate-200"
                    htmlFor="description"
                  >
                    Project scope
                  </label>
                  <textarea
                    id="description"
                    {...register('description')}
                    placeholder="Share the scope, timelines, existing equipment, or links to plans."
                    rows={5}
                    className={`${inputClass} min-h-[140px] resize-y`}
                    suppressHydrationWarning
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-destructive">{errors.description.message}</p>
                  )}
                </div>
                <div>
                  <label
                    className="text-sm font-medium text-slate-700 dark:text-slate-200"
                    htmlFor="budget"
                  >
                    Budget range (optional)
                  </label>
                  <select
                    id="budget"
                    {...register('budget')}
                    className={inputClass}
                    defaultValue=""
                    suppressHydrationWarning
                  >
                    <option value="">Select budget range</option>
                    {budgetOptions.map((option) => (
                      <option key={option.value} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Sharing budget helps us tailor materials and phase the project appropriately.
                  </p>
                </div>
                <div>
                  <label
                    className="text-sm font-medium text-slate-700 dark:text-slate-200"
                    htmlFor="preferredTime"
                  >
                    Preferred onsite time (optional)
                  </label>
                  <select
                    id="preferredTime"
                    {...register('preferredTime')}
                    className={inputClass}
                    defaultValue=""
                    suppressHydrationWarning
                  >
                    <option value="">Select preferred time</option>
                    {preferredTimeOptions.map((option) => (
                      <option key={option.value} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    className="text-sm font-medium text-slate-700 dark:text-slate-200"
                    htmlFor="attachments"
                  >
                    Upload files (optional)
                  </label>
                  <input
                    id="attachments"
                    {...register('attachments')}
                    type="file"
                    multiple
                    className={inputClass}
                  />
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    Add photos, floor plans, or spec sheets to help us scope with precision.
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/40 transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-70 dark:focus-visible:ring-offset-slate-950"
                  suppressHydrationWarning
                >
                  {isSubmitting ? 'Submitting...' : 'Send my quote request'}
                </button>
              </form>
            </div>
          </div>
        </div>
        <Toast />
      </section>
    </main>
  );
}
