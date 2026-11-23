---
title: What I learned building my first React + TypeScript app
date: 2026-11-23
summary: Components, props, state, derived data and a custom localStorage hook — the lessons from Spendly, my expense tracker.
tags: [React, TypeScript, Learning]
---

Spendly is a small expense tracker. It was my first serious React project after years of HTML, CSS, PHP and WordPress. Here are the ideas that clicked for me.

## 1. Components are functions

A component is just a function that returns UI. Splitting the app into `Header`, `ExpenseForm`, `ExpenseList` and `ExpenseItem` made every file short and easy to read.

## 2. Props go down, events go up

The list of expenses lives in the parent (`App`). Children receive data through **props** and call functions like `onAdd` or `onDelete` to ask the parent for changes.

```tsx
<ExpenseList expenses={visibleExpenses} onDelete={deleteExpense} />
```

## 3. Don't store what you can calculate

Totals, averages and the filtered list are **derived** from state. I calculate them with `useMemo` instead of keeping extra state that could get out of sync.

## 4. A custom hook for localStorage

```ts
const [expenses, setExpenses] = useLocalStorage<Expense[]>('spendly:expenses', []);
```

It works like `useState`, but the data survives a page refresh. Writing my own generic hook was the moment TypeScript generics finally made sense.

## What's next

Next I learned to fetch real data from an API with TanStack Query (SkyCast), and then moved to Next.js — the framework this blog is built with.
