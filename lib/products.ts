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
    sku: "sample",
    slug: "sample-pack",
    title: "Sample Pack",
    price: 9,
    description: "Freeze-dried cucumber cubes for drinks, ice trays, and popsicles.",
    image: "/assets/products/sample.jpg",
    benefits: ["100% Natural","Lab Tested","Vegan"],
    category: "powders"
  },
  {
    sku: "toner",
    slug: "cucumber-toner",
    title: "Cucumber Toner",
    price: 18,
    description: "Lightweight toner that calms and hydrates.",
    image: "/assets/products/toner.jpg",
    benefits: ["Soothes redness","Hydrates fast","pH balanced"],
    category: "face"
  },
  {
    sku: "mask",
    slug: "hydra-gel-mask",
    title: "Hydra-Gel Mask",
    price: 24,
    description: "Cooling gel mask for instant plumpness and glow.",
    image: "/assets/products/mask.jpg",
    benefits: ["Plumps skin","Cooling feel"],
    category: "face"
  },
  {
    sku: "paste",
    slug: "cucumber-toothpaste",
    title: "Cucumber Toothpaste",
    price: 8,
    description: "Fresh cucumber-mint toothpaste for a clean, cool feel.",
    image: "/assets/products/toothpaste.jpg",
    benefits: ["Fluoride-free","Fresh breath"],
    category: "toothpaste"
  },
  {
    sku: "spa",
    slug: "at-home-spa-kit",
    title: "At-Home Spa Kit",
    price: 39,
    description: "Curated set for a full cucumber ritual.",
    image: "/assets/products/spa.jpg",
    benefits: ["Great gift","Complete ritual"],
    category: "spa-packages"
  },
  {
    sku: "lotion",
    slug: "cucumber-body-lotion",
    title: "Cucumber Body Lotion",
    price: 16,
    description: "Lightweight body hydration with cucumber extract.",
    image: "/assets/products/lotion.jpg",
    benefits: ["Non-greasy","Quick absorb"],
    category: "body"
  }
];

export const bySlug = (slug: string) => PRODUCTS.find(p => p.slug === slug);