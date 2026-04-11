import React from "react";

const base = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function IconClock({ size = 24, className }) {
  return (
    <svg {...base} width={size} height={size} className={className}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export function IconSearch({ size = 24, className }) {
  return (
    <svg {...base} width={size} height={size} className={className}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export function IconX({ size = 24, className }) {
  return (
    <svg {...base} width={size} height={size} className={className}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export function IconArrowRight({ size = 24, className }) {
  return (
    <svg {...base} width={size} height={size} className={className}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function IconArrowLeft({ size = 24, className }) {
  return (
    <svg {...base} width={size} height={size} className={className}>
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

export function IconStar({ size = 24, className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}

export function IconFileSearch({ size = 24, className }) {
  return (
    <svg {...base} width={size} height={size} className={className}>
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M4.268 21a2 2 0 0 0 1.727 1H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3" />
      <path d="m9 18-1.5-1.5" />
      <circle cx="5" cy="14" r="3" />
    </svg>
  );
}

export function IconChevronLeft({ size = 24, className }) {
  return (
    <svg {...base} width={size} height={size} className={className}>
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

export function IconChevronRight({ size = 24, className }) {
  return (
    <svg {...base} width={size} height={size} className={className}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export function IconShare({ size = 24, className }) {
  return (
    <svg {...base} width={size} height={size} className={className}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
      <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
    </svg>
  );
}

export function IconLink({ size = 24, className }) {
  return (
    <svg {...base} width={size} height={size} className={className}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

export function IconHome({ size = 24, className }) {
  return (
    <svg {...base} width={size} height={size} className={className}>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
