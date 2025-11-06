export default function CTABar() {
  return (
    <aside className="sticky bottom-0 z-30 w-full border-t border-black/5 bg-white/90 backdrop-blur dark:bg-neutral_dark/90">
      <div className="container-page flex items-center justify-between py-3 text-sm">
        <span className="opacity-80">How can we help today?</span>
        <div className="flex gap-2">
          <a className="btn-secondary px-4 py-2" href="tel:+1-000-000-0000">Call</a>
          <a className="btn-primary px-4 py-2" href="/booking">Book</a>
          <a className="btn px-4 py-2 border" href="/quote">Quote</a>
        </div>
      </div>
    </aside>
  );
}


