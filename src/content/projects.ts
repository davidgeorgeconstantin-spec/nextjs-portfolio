import type { Project } from '@/types/content';

const gh = (repo: string) => `https://github.com/davidgeorgeconstantin-spec/${repo}`;
const live = (repo: string) => `https://davidgeorgeconstantin-spec.github.io/${repo}/`;

/** My learning roadmap: 10 projects, from React basics to a full-stack SaaS. */
export const projects: Project[] = [
  { order: 1, slug: 'spendly', title: 'Spendly', summary: 'Expense tracker with filters, sorting, charts and localStorage.', stack: ['React', 'TypeScript', 'Vite'], status: 'live', repo: gh('spendly'), live: live('spendly') },
  { order: 2, slug: 'skycast', title: 'SkyCast', summary: 'Weather explorer with city autocomplete, 24h chart and 7-day forecast.', stack: ['React', 'TanStack Query', 'React Router', 'Motion'], status: 'live', repo: gh('skycast'), live: live('skycast') },
  { order: 3, slug: 'nextjs-portfolio', title: 'Portfolio & Blog', summary: 'This site: Next.js App Router, static export, Markdown blog, GSAP animations.', stack: ['Next.js', 'Tailwind', 'GSAP'], status: 'live', repo: gh('nextjs-portfolio'), live: live('nextjs-portfolio') },
  { order: 4, slug: 'bookit-api', title: 'BookIt API', summary: 'REST API for bookings with validation and tests, plus a browser demo.', stack: ['Node', 'Express', 'Zod', 'PostgreSQL'], status: 'live', repo: gh('bookit-api'), live: live('bookit-api') },
  { order: 5, slug: 'taskflow', title: 'TaskFlow', summary: 'Kanban board with accounts and drag & drop.', stack: ['Next.js', 'dnd-kit', 'Auth'], status: 'live', repo: gh('taskflow'), live: live('taskflow') },
  { order: 6, slug: 'shoplite', title: 'ShopLite', summary: 'Online shop: catalog, variants, cart, coupons and a simulated checkout.', stack: ['Next.js', 'Zustand', 'E-commerce'], status: 'live', repo: gh('shoplite'), live: live('shoplite') },
  { order: 7, slug: 'shoplite-ai', title: 'ShopLite AI', summary: 'Shopping assistant chat with retrieval over products and FAQ.', stack: ['Next.js', 'AI', 'RAG'], status: 'live', repo: gh('shoplite-ai'), live: live('shoplite-ai') },
  { order: 8, slug: 'insights-dashboard', title: 'Insights', summary: 'Analytics dashboard with charts, a data table and CSV export.', stack: ['Next.js', 'Recharts', 'TanStack Table'], status: 'live', repo: gh('insights-dashboard'), live: live('insights-dashboard') },
  { order: 9, slug: 'chatroom', title: 'ChatRoom', summary: 'Real-time chat with rooms, typing indicator and presence.', stack: ['React', 'Socket.io', 'Realtime'], status: 'live', repo: gh('chatroom'), live: live('chatroom') },
  { order: 10, slug: 'bookflow-saas', title: 'BookFlow SaaS', summary: 'Booking platform for small businesses: services, calendar, dashboard.', stack: ['Next.js', 'SaaS', 'GSAP'], status: 'live', repo: gh('bookflow-saas'), live: live('bookflow-saas') },
];
