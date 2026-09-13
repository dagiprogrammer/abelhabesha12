import { Product } from '../types';

/**
 * Default fallback image placeholder with authentic Ethiopian cross / cultural motif.
 * No test or AI-generated photos. Real product images are added via the Admin panel.
 */
export const DEFAULT_PRODUCT_IMAGE = 
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750" fill="none">
      <rect width="600" height="750" fill="#F9F4EC"/>
      <rect x="20" y="20" width="560" height="710" rx="16" stroke="#EAD8C0" stroke-width="2" stroke-dasharray="8 8"/>
      <circle cx="300" cy="320" r="70" fill="#8B0000" fill-opacity="0.08"/>
      <path d="M300 270 V370 M250 320 H350 M265 285 L335 355 M335 285 L265 355" stroke="#8B0000" stroke-width="4" stroke-linecap="round"/>
      <circle cx="300" cy="320" r="22" stroke="#C5A059" stroke-width="3" fill="none"/>
      <text x="300" y="430" text-anchor="middle" font-family="serif" font-size="20" font-weight="bold" fill="#8B0000">አቤል ሀበሻ • ABEL HABESHA</text>
      <text x="300" y="460" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#2D241E" fill-opacity="0.7">Handcrafted Traditional Attire • Shiromeda</text>
      <text x="300" y="490" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#C5A059" font-weight="600">Product Image Pending Upload</text>
    </svg>
  `);

/**
 * Catalog is initially empty.
 * All products are uploaded dynamically by the store manager via /admin.
 */
export const PRODUCTS: Product[] = [];
