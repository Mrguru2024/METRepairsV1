'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import services from '@/data/services.json';
import { bookingSchema, type BookingInput } from '@/lib/validation/booking';
import { cn } from '@/lib/utils';
import { useToast } from '@/lib/toast';
import type { BookingFormValues } from '@/types/booking';

interface BookingRecord {
  id: string;
  date: string;
  service: string;
}

const timeSlots = ['09:00', '11:00', '13:00', '15:00', '17:00'];
function toDateKey(date: Date) {
  return date.toISOString().split('T')[0]!;
}

function combineDateAndTime(date: Date, time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  const combined = new Date(date);
  combined.setHours(hours, minutes, 0, 0);
  return combined;
}

function createCalendarDays(anchor: Date) {
  const year = anchor.getFullYear();
  const month = anchor.getMonth();
  const firstDay = new Date(year, month, 1);
  const firstWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days: Date[] = [];
  for (let i = 0; i < firstWeekday; i += 1) {
    const day = new Date(year, month, i - firstWeekday + 1);
    days.push(day);
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    days.push(new Date(year, month, day));
  }
  while (days.length % 7 !== 0) {
    const last = days[days.length - 1];
    days.push(new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1));
  }
  return days;
}

export default function BookingScheduler() {
  const today = useMemo(() => new Date(), []);
  const { setMsg, Toast } = useToast();
  const [currentMonth, setCurrentMonth] = useState<Date>(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: '',
      date: '',
      notes: '',
    },
  });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/bookings', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load bookings');
        const data = (await res.json()) as { bookings: BookingRecord[] };
        setBookings(data.bookings);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load bookings');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const bookedSlotLookup = useMemo(() => {
    return bookings.reduce<Record<string, Set<string>>>((acc, booking) => {
      const dateObj = new Date(booking.date);
      const key = toDateKey(dateObj);
      if (!acc[key]) acc[key] = new Set();
      acc[key]!.add(dateObj.toISOString().slice(11, 16));
      return acc;
    }, {});
  }, [bookings]);

  const isOutsideCurrentMonth = useCallback(
    (date: Date) => date.getMonth() !== currentMonth.getMonth() || date.getFullYear() !== currentMonth.getFullYear(),
    [currentMonth],
  );

  const isPastDate = useCallback(
    (date: Date) => {
      const normalized = new Date(date);
      normalized.setHours(0, 0, 0, 0);
      const todayNormalized = new Date(today);
      todayNormalized.setHours(0, 0, 0, 0);
      return normalized < todayNormalized;
    },
    [today],
  );

  const onSelectDate = (date: Date) => {
    if (isPastDate(date) || isOutsideCurrentMonth(date)) return;
    setSelectedDate(date);
    setSelectedTime(null);
    setValue('date', '', { shouldValidate: true, shouldDirty: true });
  };

  const onSelectTime = (time: string) => {
    if (!selectedDate) {
      setMsg('Please choose a date first.');
      return;
    }
    const slot = combineDateAndTime(selectedDate, time);
    setSelectedTime(time);
    setValue('date', slot.toISOString(), { shouldValidate: true, shouldDirty: true });
  };

  const onSubmit = async (values: BookingFormValues) => {
    const payload: BookingInput = {
      ...values,
      phone: values.phone?.trim() ? values.phone.trim() : undefined,
      notes: values.notes?.trim() ? values.notes.trim() : undefined,
    };

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.status === 409) {
        setMsg('That slot was just booked. Please pick another.');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to save booking');
      }

      const { booking } = (await response.json()) as { booking: BookingRecord };
      setBookings((prev) => [...prev, booking]);
      setMsg('Booking confirmed! We will reach out shortly.');
      setSelectedDate(null);
      setSelectedTime(null);
      reset({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        notes: '',
      });
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Error saving booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  const calendarDays = useMemo(() => createCalendarDays(currentMonth), [currentMonth]);
  const selectedDateKey = selectedDate ? toDateKey(selectedDate) : null;
  const serviceWatcher = watch('service');

  return (
    <section className="mx-auto grid max-w-5xl gap-8 rounded-3xl border border-neutral-200 bg-white/70 p-6 shadow-lg backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/60 sm:grid-cols-[1.2fr_1fr] sm:p-10">
      <div>
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Schedule a Booking</h1>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Choose a date and time that works best. We&apos;ll confirm within one business day.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="btn-secondary h-9 px-3 text-sm"
              onClick={() =>
                setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
              }
              aria-label="Previous Month"
            >
              ‹
            </button>
            <div className="text-sm font-medium">
              {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </div>
            <button
              type="button"
              className="btn-secondary h-9 px-3 text-sm"
              onClick={() =>
                setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
              }
              aria-label="Next Month"
            >
              ›
            </button>
          </div>
        </header>

        <div className="grid grid-cols-7 text-center text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 text-sm">
          {calendarDays.map((date) => {
            const isDisabled = isPastDate(date) || isOutsideCurrentMonth(date);
            const isSelected = selectedDateKey === toDateKey(date);
            return (
              <button
                key={date.toISOString()}
                type="button"
                onClick={() => onSelectDate(date)}
                disabled={isDisabled}
                className={cn(
                  'rounded-lg py-3 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                  isDisabled
                    ? 'cursor-not-allowed text-neutral-300 dark:text-neutral-700'
                    : 'hover:bg-primary/10',
                  isOutsideCurrentMonth(date) && 'text-neutral-300 dark:text-neutral-600',
                  isSelected && 'bg-primary text-white hover:bg-primary',
                )}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>

        <div className="mt-6">
          <h2 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Available Time Slots</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {timeSlots.map((slot) => {
              const taken = selectedDateKey ? bookedSlotLookup[selectedDateKey]?.has(slot) : false;
              const isActive = selectedTime === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => !taken && onSelectTime(slot)}
                  disabled={taken}
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm transition',
                    taken
                      ? 'cursor-not-allowed border-neutral-200 text-neutral-300 dark:border-neutral-800 dark:text-neutral-700'
                      : 'border-neutral-300 hover:border-primary hover:text-primary dark:border-neutral-700 dark:hover:border-primary',
                    isActive && !taken && 'border-primary bg-primary text-white dark:border-primary',
                  )}
                >
                  {slot}
                </button>
              );
            })}
          </div>
          {errors.date && <p className="mt-2 text-sm text-red-500">{errors.date.message}</p>}
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Full Name</span>
            <input
              {...register('name')}
              type="text"
              placeholder="Jamie Rivera"
              className="input"
              autoComplete="name"
            />
          </label>
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Email</span>
            <input
              {...register('email')}
              type="email"
              placeholder="you@example.com"
              className="input"
              autoComplete="email"
            />
          </label>
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Phone</span>
            <input
              {...register('phone')}
              type="tel"
              placeholder="(555) 123-4567"
              className="input"
              autoComplete="tel"
            />
          </label>
          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Service</span>
            <select {...register('service')} className="input">
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service.title} value={service.title}>
                  {service.title}
                </option>
              ))}
            </select>
          </label>
          {errors.service && <p className="mt-1 text-sm text-red-500">{errors.service.message}</p>}
        </div>
        {serviceWatcher && (
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm text-primary">
            We&apos;ll tailor the visit for <strong>{serviceWatcher}</strong>.
          </div>
        )}
        <div>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Notes</span>
            <textarea
              {...register('notes')}
              rows={4}
              placeholder="Tell us about access instructions, priorities, or anything else."
              className="input resize-none"
            />
          </label>
          {errors.notes && <p className="mt-1 text-sm text-red-500">{errors.notes.message}</p>}
        </div>

        <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Confirm Booking'}
        </button>
        {error && <p className="text-sm text-red-500">{error}</p>}
        {isLoading && <p className="text-sm text-neutral-500 dark:text-neutral-400">Loading availability...</p>}
      </form>
      <Toast />
    </section>
  );
}

