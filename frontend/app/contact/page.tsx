'use client';
import { useState } from 'react';
import { z } from 'zod';
import { postJson } from '@/lib/api';
import { useToast } from '@/lib/toast';

const schema = z.object({ name: z.string().min(2), email: z.string().email(), message: z.string().min(5) });

export default function ContactPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { setMsg, Toast } = useToast();

  async function onSubmit(formData: FormData) {
    setErrors({});
    const data = Object.fromEntries(formData) as Record<string, string>;
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      Object.entries(parsed.error.flatten().fieldErrors).forEach(([k, v]) => {
        if (v && v.length) fieldErrors[k] = v[0] as string;
      });
      setErrors(fieldErrors);
      setMsg('Please fix the highlighted fields.');
      return;
    }
    await postJson('/api/contact', parsed.data);
    setMsg('Thanks. We will reply shortly.');
  }

  return (
    <main className="container-page py-10">
      <h1 className="text-2xl font-semibold">Contact</h1>
      <form action={onSubmit} className="mt-6 grid gap-4 md:max-w-xl">
        <input name="name" placeholder="Full name" className="rounded border p-3" required />
        {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
        <input name="email" type="email" placeholder="Email" className="rounded border p-3" required />
        {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
        <textarea name="message" placeholder="How can we help?" className="rounded border p-3" required />
        {errors.message && <p className="text-sm text-red-600">{errors.message}</p>}
        <button className="btn-primary px-5 py-3">Send</button>
      </form>
      <Toast />
    </main>
  );
}

