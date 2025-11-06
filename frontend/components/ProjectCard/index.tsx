export interface ProjectCardProps {
  title: string;
  outcome: string;
}

export default function ProjectCard({ title, outcome }: ProjectCardProps) {
  return (
    <article className="rounded-lg border border-black/5 p-5">
      <div className="aspect-video rounded bg-neutral-200 dark:bg-neutral-800" />
      <h3 className="mt-3 text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm opacity-70">{outcome}</p>
    </article>
  );
}


