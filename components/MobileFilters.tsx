"use client";
import { useEffect } from "react";

export default function MobileFilters({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  // lock background scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] md:hidden">
      {/* Backdrop */}
      <button aria-label="Close filters" onClick={onClose} className="absolute inset-0 bg-black/40" />

      {/* Bottom sheet */}
      <div className="absolute inset-x-0 bottom-0 top-24 rounded-t-2xl bg-[#e9dfc8] shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h3 className="font-semibold">Filter by</h3>
          <button
            onClick={onClose}
            className="rounded px-3 py-1.5 bg-white text-gray-700 border hover:bg-gray-50"
          >
            Done
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
}