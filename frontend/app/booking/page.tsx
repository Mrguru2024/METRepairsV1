import type { Metadata } from 'next';
import BookingScheduler from '@/components/BookingScheduler';

export const metadata: Metadata = {
  title: 'Book Your Service | MET Repairs',
  description:
    'Schedule an on-site visit with MET Repairs. Pick a date and time that works for you and we will confirm right away.',
};

export default function BookingPage() {
  return (
    <main className="container-page space-y-10 py-12">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm uppercase tracking-wider text-primary">Booking</p>
        <h1 className="mt-2 text-3xl font-semibold text-neutral-900 dark:text-neutral-50 sm:text-4xl">
          Lock in your service window
        </h1>
        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300">
          Choose a time and share a few details. We’ll review your request, confirm availability, and arrive ready to
          get to work.
        </p>
      </div>
      <BookingScheduler />
    </main>
  );
}

