interface IconProps {
  className?: string;
}

export function ChevronDown({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronRight({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M6 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PhoneIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3.5 4.5c0-.83.67-1.5 1.5-1.5h2.06c.6 0 1.13.35 1.37.9l1.1 2.5c.22.5.1 1.08-.3 1.45l-1.15 1.1c.5 1.3 1.55 2.35 2.85 2.85l1.1-1.15c.37-.4.95-.52 1.45-.3l2.5 1.1c.55.24.9.77.9 1.37v2.06c0 .83-.67 1.5-1.5 1.5C9.6 17.88 2.12 10.4 3.5 4.5Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MenuIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CloseIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function GraduationCap({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M12 4L2 9l10 5 10-5-10-5Z"
        fill="currentColor"
        opacity={0.95}
      />
      <path
        d="M6.5 11.2v3.3c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3v-3.3l-5.5 2.75-5.5-2.75Z"
        fill="currentColor"
        opacity={0.55}
      />
      <path
        d="M19 9.5V15"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
      />
    </svg>
  );
}
