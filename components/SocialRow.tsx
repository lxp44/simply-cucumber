"use client";

import {
  FaXTwitter,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaLinkedinIn,
} from "react-icons/fa6";

type Props = {
  // if you ever want to override the default links from outside
  links?: Partial<{
    x: string;
    facebook: string;
    instagram: string;
    tiktok: string;
    linkedin: string;
  }>;
};

export default function SocialRow({ links = {} }: Props) {
  const L = {
    x:        "https://x.com/your-handle",
    facebook: "https://facebook.com/your-handle",
    instagram:"https://instagram.com/your-handle",
    tiktok:   "https://www.tiktok.com/@your-handle",
    linkedin: "https://www.linkedin.com/company/your-handle",
    ...links,
  };

  const base =
    "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white hover:bg-white/20 hover:border-white/40 transition";

  return (
    <div className="mt-8">
      <h3 className="text-sm font-semibold tracking-wide text-white/90">
        FOLLOW US
      </h3>

      <ul className="mt-3 flex items-center gap-4">
        <li>
          <a className={base} href={L.x} aria-label="Follow us on X (Twitter)" target="_blank" rel="noopener noreferrer">
            <FaXTwitter className="h-4 w-4" />
          </a>
        </li>
        <li>
          <a className={base} href={L.facebook} aria-label="Follow us on Facebook" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="h-4 w-4" />
          </a>
        </li>
        <li>
          <a className={base} href={L.instagram} aria-label="Follow us on Instagram" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="h-4 w-4" />
          </a>
        </li>
        <li>
          <a className={base} href={L.tiktok} aria-label="Follow us on TikTok" target="_blank" rel="noopener noreferrer">
            <FaTiktok className="h-4 w-4" />
          </a>
        </li>
        <li>
          <a className={base} href={L.linkedin} aria-label="Follow us on LinkedIn" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn className="h-4 w-4" />
          </a>
        </li>
      </ul>
    </div>
  );
}