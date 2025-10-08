export type Product = {
  sku: string;
  slug: string;
  title: string;
  price: number;
  description: string;
  image: string;        // e.g. "/assets/products/sample.jpg"
  benefits: string[];
  category: "face" | "body" | "powders" | "toothpaste" | "spa-packages";
};

export const PRODUCTS: Product[] = [
  {
    sku: "powder",
    slug: "simply-cucumber-powder",
    title: "Simply Cucumber Powder",
    price: 25,
    description:
      "Freeze-dried cucumber powder packed with vitamins and antioxidants. Blend it into drinks, face masks, or spa water for a daily boost of clarity and hydration.",
    image: "/assets/products/cucumber-powder.jpg",
    benefits: ["100% Natural", "Rich in Vitamins", "Hydration Boost"],
    category: "powders",
  },
  {
    sku: "sample",
    slug: "sample-pack",
    title: "Sample Pack",
    price: 9,
    description:
      "Freeze-dried cucumber cubes for drinks, ice trays, and popsicles.",
    image: "/assets/products/sample.jpg",
    benefits: ["100% Natural", "Lab Tested", "Vegan"],
    category: "powders",
  },
  {
    sku: "mask",
    slug: "hydra-gel-mask",
    title: "Hydra-Gel Mask",
    price: 24,
    description:
      "Cooling gel mask for instant plumpness and glow.",
    image: "/assets/products/mask.jpg",
    benefits: ["Plumps Skin", "Cooling Feel"],
    category: "face",
  },
  {
    sku: "paste",
    slug: "cucumber-toothpaste",
    title: "Cucumber Toothpaste",
    price: 8,
    description:
      "Fresh cucumber-mint toothpaste for a clean, cool feel.",
    image: "/assets/products/toothpaste.jpg",
    benefits: ["Fluoride-Free", "Fresh Breath"],
    category: "toothpaste",
  },
  {
    sku: "spa",
    slug: "at-home-spa-kit",
    title: "At-Home Spa Kit",
    price: 39,
    description:
      "Curated cucumber spa ritual — includes mist, scrub, mask, and gel pads for full-body rejuvenation.",
    image: "/assets/products/spa.jpg",
    benefits: ["Great Gift", "Complete Ritual"],
    category: "spa-packages",
  },
  {
    sku: "lotion",
    slug: "cucumber-body-lotion",
    title: "Cucumber Body Lotion",
    price: 16,
    description:
      "Lightweight daily hydration infused with cooling cucumber extract.",
    image: "/assets/products/lotion.jpg",
    benefits: ["Non-Greasy", "Quick Absorb"],
    category: "body",
  },
];

export const bySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
