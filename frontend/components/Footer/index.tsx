import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-black/5 py-8 text-sm">
      <div className="container-page flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="opacity-70">© {new Date().getFullYear()} MET Repairs</p>
        <div className="flex gap-4">
          <Link href="/contact">Contact</Link>
          <Link href="/about">About</Link>
          <Link href="/reviews">Reviews</Link>
        </div>
      </div>
    </footer>
  );
}


