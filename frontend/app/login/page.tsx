'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/lib/toast';

export default function LoginPage() {
  const router = useRouter();
  const { setMsg, Toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });

    if (result?.error) {
      setMsg('Invalid email or password');
      setLoading(false);
    } else {
      router.push('/admin');
      router.refresh();
    }
  }

  return (
    <main className="container-page flex min-h-[calc(100vh-56px)] items-center justify-center py-16">
      <div className="w-full max-w-md rounded-lg border border-black/10 bg-white p-8 shadow-lg dark:border-white/10 dark:bg-neutral-900">
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-neutral-800"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-neutral-800"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full px-4 py-2.5">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
      <Toast />
    </main>
  );
}

