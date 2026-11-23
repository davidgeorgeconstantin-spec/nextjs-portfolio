---
title: Fetching data with TanStack Query (notes from SkyCast)
date: 2026-11-23
summary: Loading states, errors, caching, debounced search and request cancellation — how I fetch weather data without writing the boring parts myself.
tags: [React, APIs, TanStack Query]
---

For SkyCast I used the free Open-Meteo API. Fetching data sounds easy, until you need loading spinners, error messages, retries and cache. TanStack Query handles all of that.

## The basic pattern

```ts
const { data, isLoading, isError, refetch } = useQuery({
  queryKey: ['forecast', lat, lon, units],
  queryFn: ({ signal }) => getForecast(lat, lon, units, signal),
  staleTime: 1000 * 60 * 10,
});
```

- **queryKey** is the name of the data in the cache. When the city or the units change, new data is requested.
- **staleTime** says how long data stays "fresh". Going back to a city you visited is instant.
- **signal** cancels old requests, so a slow response can't overwrite a newer one.

## Debounced search

The city search waits 350 ms after the last key press before calling the API. It is a tiny `useDebounce` hook with a cleanup function in `useEffect`.

## Clean API layer

Components never see the raw API response. A function in `lib/api.ts` turns parallel arrays from the API into typed objects like `DailyForecast[]`. If the API changes, only one file changes.
