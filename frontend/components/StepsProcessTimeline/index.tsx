const steps = ['Assess', 'Plan', 'Install', 'Test', 'Document'];

export default function StepsProcessTimeline() {
  return (
    <section className="container-page py-12">
      <ol className="grid gap-4 sm:grid-cols-5">
        {steps.map((s, i) => (
          <li key={s} className="rounded-lg border border-black/5 p-4 text-center">
            <div className="text-xs opacity-60">Step {i + 1}</div>
            <div className="text-sm font-medium">{s}</div>
          </li>
        ))}
      </ol>
    </section>
  );
}


