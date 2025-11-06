'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { QuoteSchema, type QuoteInput } from '@/lib/validation/quote';
import { useToast } from '@/lib/toast';

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

  async function onSubmit(data: QuoteInput & { attachments?: FileList }) {
    try {
      // Create FormData for multipart upload
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'attachments' && value != null) {
          formData.append(key, String(value));
        }
      });

      // Append files if present
      if (data.attachments && data.attachments.length > 0) {
        Array.from(data.attachments).forEach((file) => {
          formData.append('attachments', file);
        });
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
      setMsg('Submission failed. Please try again.');
    }
  }

  return (
    <main className="container-page py-10">
      <h1 className="text-2xl font-semibold">Get a Quote</h1>
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
          <input
            {...register('phone')}
            placeholder="Phone"
            className="w-full rounded border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          {errors.phone && <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>}
        </div>
        <div>
          <select
            {...register('service')}
            className="w-full rounded border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
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
          {errors.service && <p className="mt-1 text-sm text-destructive">{errors.service.message}</p>}
        </div>
        <div>
          <input
            {...register('address')}
            placeholder="Address"
            className="w-full rounded border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          {errors.address && <p className="mt-1 text-sm text-destructive">{errors.address.message}</p>}
        </div>
        <div>
          <input
            {...register('zip')}
            placeholder="Zip"
            className="w-full rounded border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          {errors.zip && <p className="mt-1 text-sm text-destructive">{errors.zip.message}</p>}
        </div>
        <div>
          <textarea
            {...register('description')}
            placeholder="Scope description"
            rows={5}
            className="w-full rounded border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          {errors.description && <p className="mt-1 text-sm text-destructive">{errors.description.message}</p>}
        </div>
        <div>
          <input
            {...register('attachments')}
            type="file"
            multiple
            className="w-full rounded border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        <button type="submit" disabled={isSubmitting} className="btn-primary px-5 py-3">
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      <Toast />
    </main>
  );
}

