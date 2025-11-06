'use client';
import { useEffect, useState } from 'react';

export function useToast() {
  const [msg, setMsg] = useState<string | null>(null);
  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(() => setMsg(null), 3000);
    return () => clearTimeout(t);
  }, [msg]);
  const Toast = () =>
    msg ? (
      <div className="fixed bottom-4 right-4 rounded bg-neutral-900 px-4 py-2 text-white shadow-lg dark:bg-neutral-100 dark:text-neutral-900">
        {msg}
      </div>
    ) : null;
  return { setMsg, Toast } as const;
}

