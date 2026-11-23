export type ProjectStatus = 'live' | 'in-progress' | 'planned';

export interface Project {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  status: ProjectStatus;
  repo?: string;
  live?: string;
  order: number;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  summary: string;
  tags: string[];
  readingMinutes: number;
}

export interface Post extends PostMeta {
  html: string;
}
