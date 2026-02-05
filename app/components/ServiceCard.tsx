interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function ServiceCard({
  icon,
  title,
  description,
}: ServiceCardProps) {
  return (
    <div className="group rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8 transition-all hover:border-[var(--primary)]/30 hover:shadow-lg hover:shadow-[var(--primary)]/5 dark:bg-[var(--slate-900)]">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
        {icon}
      </div>
      <h3 className="mb-3 text-lg font-semibold text-[var(--foreground)]">
        {title}
      </h3>
      <p className="text-[15px] leading-relaxed text-[var(--muted)]">
        {description}
      </p>
    </div>
  );
}
