import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';

export default function HeaderNav() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-black/5 bg-white/80 backdrop-blur dark:bg-neutral_dark/80">
      <div className="container-page flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image
            src="/images/brand/Met repairs logo 2-Photoroom.png"
            alt="MET Repairs logo"
            width={36}
            height={36}
            priority
          />
          <span className="text-primary">{siteConfig.name}</span>
        </Link>
        <nav className="hidden gap-6 md:flex">
          {siteConfig.nav.map((item) => (
            <Link key={item.path} href={item.path} className="text-sm hover:opacity-80">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/booking" className="btn-primary h-9 px-4 text-sm">
          Book Now
        </Link>
      </div>
    </header>
  );
}


