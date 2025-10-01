// components/SortBy.tsx
'use client';

import { useRouter, usePathname } from 'next/navigation';

type Props = {
  category?: string | null;
  sort?: string | null;
};

const OPTIONS = [
  { value: 'featured',   label: 'Featured' },
  { value: 'best',       label: 'Best selling' },
  { value: 'az',         label: 'Alphabetically, A-Z' },
  { value: 'za',         label: 'Alphabetically, Z-A' },
  { value: 'price-asc',  label: 'Price, low to high' },
  { value: 'price-desc', label: 'Price, high to low' },
  { value: 'date-asc',   label: 'Date, old to new' },
  { value: 'date-desc',  label: 'Date, new to old' },
];

export default function SortBy({ category, sort }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const value = sort ?? 'featured';

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const v = e.target.value;
    const qp = new URLSearchParams();
    if (category) qp.set('category', category);
    if (v && v !== 'featured') qp.set('sort', v);
    const qs = qp.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <span className="text-gray-600">Sort by</span>
      <select
        value={value}
        onChange={onChange}
        className="rounded-md border px-3 py-2 hover:border-gray-400 focus:outline-none"
      >
        {OPTIONS.map(o => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
