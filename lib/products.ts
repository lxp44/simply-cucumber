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
    slug: "powder",
    title: "Powder",
    price: 25,
    description:
      "Freeze-dried cucumber powder packed with vitamins and antioxidants. Blend it into drinks, face masks, or spa water for a daily boost of clarity and hydration.",
    image: "/assets/products/cucumber-powder.jpg",
    benefits: ["100% Natural", "Rich in Vitamins", "Hydration Boost"],
    category: "powders",
  },
  {
  sku: "soap",
  slug: "soap",
  title: "Cucumber Soap",
  price: 6,
  description:
    "Indulge your skin in the refreshing simplicity of cucumber. Our Simply Cucumber Soap cleanses deeply without stripping away natural oils, leaving your skin feeling soft, balanced, and hydrated. Each bar is crafted with real cucumber extract—rich in antioxidants and natural antibacterial properties—to help calm irritation, fight body acne, and reduce dryness. The fresh cucumber scent awakens your senses while providing a cooling, spa-like experience every time you bathe. Perfect for daily use on face and body, this bar transforms your shower into a moment of clean, natural clarity.",
  image: "/assets/products/cucumber-soap.jpg",
  benefits: [
    "100% Natural",
    "Gently cleanses without stripping",
    "Fights body acne",
    "Leaves skin soft, not dry",
    "Cucumber scent is fresh & calming"
  ],
  category: "body",
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
