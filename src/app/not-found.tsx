import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-5 py-32 text-center">
      <p className="text-gradient text-8xl font-black">404</p>
      <p className="mt-4 text-slate-600 dark:text-slate-400">This page does not exist (yet).</p>
      <Link href="/" className="mt-8 inline-block rounded-full bg-slate-900 px-6 py-3 font-semibold text-white dark:bg-white dark:text-slate-900">
        Back home
      </Link>
    </main>
  );
}
