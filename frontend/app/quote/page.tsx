'use client';
import { useState } from 'react';
import { z } from 'zod';
import { postJson } from '@/lib/api';
import { useToast } from '@/lib/toast';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  service: z.string().min(2),
  address: z.string().min(3),
  zip: z.string().min(3),
  description: z.string().min(5),
});

export default function QuotePage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { setMsg, Toast } = useToast();

  async function onSubmit(formData: FormData) {
    setErrors({});
    const data: Record<string, any> = Object.fromEntries(formData);
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
    // send multipart if attachments present
    const upload = new FormData();
    Object.entries(parsed.data).forEach(([k, v]) => upload.append(k, String(v)));
    const files = (formData.getAll('attachments') as File[]) || [];
    files.forEach((f) => upload.append('attachments', f));
    const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const res = await fetch(base + '/api/quote', { method: 'POST', body: upload });
    if (!res.ok) {
      setMsg('Submission failed. Try again.');
      return;
    }
    setMsg('Submitted. We will contact you shortly.');
  }

  return (
    <main className="container-page py-10">
      <h1 className="text-2xl font-semibold">Get a Quote</h1>
      <form action={onSubmit} className="mt-6 grid gap-4 md:max-w-xl">
        <input name="name" placeholder="Full name" className="rounded border p-3" required />
        {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
        <input name="email" type="email" placeholder="Email" className="rounded border p-3" required />
        {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
        <input name="phone" placeholder="Phone" className="rounded border p-3" required />
        {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
        <select name="service" className="rounded border p-3" required>
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
        {errors.service && <p className="text-sm text-red-600">{errors.service}</p>}
        <input name="address" placeholder="Address" className="rounded border p-3" required />
        {errors.address && <p className="text-sm text-red-600">{errors.address}</p>}
        <input name="zip" placeholder="Zip" className="rounded border p-3" required />
        {errors.zip && <p className="text-sm text-red-600">{errors.zip}</p>}
        <textarea name="description" placeholder="Scope description" className="rounded border p-3" required />
        {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
        <input name="attachments" type="file" multiple className="rounded border p-3" />
        <button className="btn-primary px-5 py-3">Submit</button>
      </form>
      <Toast />
    </main>
  );
}

