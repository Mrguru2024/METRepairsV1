'use client';
import Link from 'next/link';
import Image from 'next/image';
import ElectricBG from '@/components/Effects/ElectricBG';
import { useAnimationPref } from '@/lib/animation';

export default function LandingHero() {
  const { enabled, Toggle } = useAnimationPref();
  return (
    <main className="relative min-h-[calc(100vh-56px)] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,_rgba(11,65,228,0.15),_transparent_35%),_radial-gradient(circle_at_80%_0%,_rgba(74,230,108,0.12),_transparent_30%)]" />
      {enabled && <ElectricBG />}
      <section className="container-page relative z-20 grid min-h-[calc(100vh-56px)] place-items-center py-16">
        <div className="max-w-3xl text-center">
          <Image src="/images/brand/Met repairs logo 2-Photoroom.png" alt="MET Repairs" width={120} height={120} className="mx-auto mb-6" />
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">MET Repairs</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg opacity-80">
            Locksmithing, Electrical, Access Control, Security, Fire Alarm, and Data/Low Voltage — one trusted team across Metro Atlanta.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/booking" className="btn-primary px-6 py-3">Book Now</Link>
            <Link href="/quote" className="btn-secondary px-6 py-3">Get a Quote</Link>
            <Link href="/home" className="btn px-6 py-3 border">Enter Site</Link>
          </div>
          <p className="mt-4 text-xs opacity-60">Licensed • Insured • Transparent Pricing</p>
        </div>
      </section>
      <Toggle />
    </main>
  );
}

