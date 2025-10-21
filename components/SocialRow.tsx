"use client";

import { FaInstagram, FaTiktok, FaFacebook, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export default function SocialRow({
  links,
}: {
  links: {
    x?: string;
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    linkedin?: string;
  };
}) {
  const iconClass =
    "w-6 h-6 hover:scale-110 transition-transform duration-200 text-white hover:text-[#d4af37]";

  return (
    <div className="flex justify-center gap-5 mt-3 mb-6">
      {links.x && (
        <a href={links.x} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
          <FaXTwitter className={iconClass} />
        </a>
      )}
      {links.facebook && (
        <a href={links.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <FaFacebook className={iconClass} />
        </a>
      )}
      {links.instagram && (
        <a href={links.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FaInstagram className={iconClass} />
        </a>
      )}
      {links.tiktok && (
        <a href={links.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
          <FaTiktok className={iconClass} />
        </a>
      )}
      {links.linkedin && (
        <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FaLinkedin className={iconClass} />
        </a>
      )}
    </div>
  );
}