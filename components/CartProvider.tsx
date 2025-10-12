"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  sku: string;
  title: string;
  price: number;
  image: string;
  qty: number;
};

type CartContextType = {
  items: CartItem[];
  count: number;
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (sku: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem("sc:cart");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  // Persist on change
  useEffect(() => {
    try {
      localStorage.setItem("sc:cart", JSON.stringify(items));
    } catch {}
  }, [items]);

  const api: CartContextType = useMemo(() => {
    return {
      items,
      count: items.reduce((sum, i) => sum + i.qty, 0),

      addItem: (item, qty = 1) => {
        setItems((prev) => {
          const next = [...prev];
          const idx = next.findIndex((i) => i.sku === item.sku);
          if (idx >= 0) {
            next[idx] = { ...next[idx], qty: next[idx].qty + qty };
          } else {
            next.push({ ...item, qty });
          }
          return next;
        });
      },

      removeItem: (sku) => {
        setItems((prev) => prev.filter((i) => i.sku !== sku));
      },

      clear: () => setItems([]),
    };
  }, [items]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider />");
  return ctx;
}