'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import ServiceCardGrid from '@/components/ServiceCardGrid';
import servicesData from '@/data/services.json';

const services = servicesData.map((s) => ({
  title: s.title,
  href: s.path,
  description: s.summary,
}));

const allCategories = Array.from(new Set(services.map((s) => s.title)));

export default function ServicesPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filtered = useMemo(() => {
    let result = services;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((s) => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
    }
    if (selectedCategory !== 'all') {
      result = result.filter((s) => s.title === selectedCategory);
    }
    return result;
  }, [search, selectedCategory]);

  return (
    <main>
      <section className="container-page py-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold md:text-5xl">Our Services</h1>
          <p className="mt-4 text-lg opacity-80">
            One trusted team for Locksmithing, Electrical, Access Control, Security Systems, Fire Alarm, Data/Low
            Voltage, TV Mounting, and Electronic Repairs across Metro Atlanta.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/booking" className="btn-primary px-5 py-3">
              Book Service
            </Link>
            <Link href="/quote" className="btn-secondary px-5 py-3">
              Get a Quote
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page pb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="search"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-neutral-900"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-neutral-900"
          >
            <option value="all">All Categories</option>
            {allCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        {filtered.length === 0 && (
          <p className="mt-8 text-center text-sm opacity-60">No services found. Try adjusting your search or filter.</p>
        )}
      </section>

      {filtered.length > 0 && <ServiceCardGrid items={filtered} />}
    </main>
  );
}
