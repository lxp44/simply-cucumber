"use client";
import { useEffect } from "react";

const SORT_OPTIONS = [
  { label: "Featured", value: "" },
  { label: "Best Selling", value: "best" },
  { label: "Alphabetically, A-Z", value: "az" },
  { label: "Alphabetically, Z-A", value: "za" },
  { label: "Price, low to high", value: "price-asc" },
  { label: "Price, high to low", value: "price-desc" },
  { label: "Date, old to new", value: "date-asc" },
  { label: "Date, new to old", value: "date-desc" },
];

export default function MobileSortDrawer({
  open,
  onClose,
  current,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  current?: string | null;
  onSelect: (value: string) => void;
}) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      {/* backdrop */}
      <button aria-label="Close sort" onClick={onClose} className="absolute inset-0 bg-black/40" />

      {/* sheet */}
      <div className="absolute inset-x-0 bottom-0 top-24 rounded-t-2xl bg-[#e9dfc8] shadow-2xl md:hidden flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h3 className="font-semibold">Sort by</h3>
          <button
            onClick={onClose}
            className="rounded px-3 py-1.5 bg-white text-gray-700 border hover:bg-gray-50"
          >
            Done
          </button>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-white/30">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onSelect(opt.value);
                onClose();
              }}
              className={`w-full text-left px-5 py-3 text-sm ${
                opt.value === current
                  ? "text-cucumber-800 font-semibold bg-white/60"
                  : "text-cucumber-950 hover:bg-white/30"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}