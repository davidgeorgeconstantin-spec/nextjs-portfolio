const SKILLS = ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL', 'MySQL', 'PHP', 'WordPress', 'WooCommerce', 'REST APIs', 'Git & GitHub', 'Motion', 'GSAP'];

/** Endless row of skills. The list is rendered twice so the loop is seamless. */
export function SkillsMarquee() {
  return (
    <section aria-label="Skills" className="marquee overflow-hidden border-y border-slate-200 py-5 dark:border-slate-800">
      <div className="marquee-track flex w-max gap-10">
        {[...SKILLS, ...SKILLS].map((s, i) => (
          <span key={i} aria-hidden={i >= SKILLS.length} className="whitespace-nowrap text-xl font-semibold text-slate-400 dark:text-slate-600">
            {s} <span className="text-gradient">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
