'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactSchema, type ContactInput } from '@/lib/validation/contact';
import { postJson } from '@/lib/api';
import { useToast } from '@/lib/toast';

export default function ContactPage() {
  const { setMsg, Toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(ContactSchema),
  });

  async function onSubmit(data: ContactInput) {
    try {
      await postJson('/api/contact', data);
      setMsg('Thanks. We will reply shortly.');
      reset();
    } catch (error) {
      setMsg('Submission failed. Please try again.');
    }
  }

  return (
    <main className="container-page py-10">
      <h1 className="text-2xl font-semibold">Contact</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4 md:max-w-xl">
        <div>
          <input
            {...register('name')}
            placeholder="Full name"
            className="w-full rounded border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>}
        </div>
        <div>
          <input
            {...register('email')}
            type="email"
            placeholder="Email"
            className="w-full rounded border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
        </div>
        <div>
          <textarea
            {...register('message')}
            placeholder="How can we help?"
            rows={5}
            className="w-full rounded border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>}
        </div>
        <button type="submit" disabled={isSubmitting} className="btn-primary px-5 py-3">
          {isSubmitting ? 'Sending...' : 'Send'}
        </button>
      </form>
      <Toast />
    </main>
  );
}

