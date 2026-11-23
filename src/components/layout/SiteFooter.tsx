import { site } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-slate-200 py-10 text-sm text-slate-500 dark:border-slate-800">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5">
        <p>© {new Date().getFullYear()} {site.name}. Built with Next.js, Tailwind CSS, Motion and GSAP.</p>
        <div className="flex gap-4">
          <a href={site.github} className="hover:text-slate-900 dark:hover:text-white">GitHub</a>
          <a href={`mailto:${site.email}`} className="hover:text-slate-900 dark:hover:text-white">Email</a>
        </div>
      </div>
    </footer>
  );
}
