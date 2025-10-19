"use client";

import { useEffect } from "react";

export default function MobileFilters({
  open,
  onClose,
  children,
  title = "Filter by",
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;  // put your <FilterSidebar /> here
  title?: string;
}) {
  // prevent body scroll while the sheet is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Backdrop */}
      <button
        aria-label="Close filters"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />
      {/* Sheet */}
      <div
        className="absolute inset-x-0 bottom-0 top-20 rounded-t-2xl bg-[#e9dfc8] shadow-2xl
                   md:hidden flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h3 className="font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="rounded px-3 py-1.5 bg-white text-gray-700 border hover:bg-gray-50"
          >
            Done
          </button>
        </div>

        {/* Filter content scrolls */}
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
          {children}
        </div>
      </div>
    </div>
  );
}