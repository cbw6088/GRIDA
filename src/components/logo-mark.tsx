type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect x="5" y="9" width="17" height="46" fill="#5F7A70" />
      <rect x="23" y="9" width="17" height="46" fill="#E8DCC4" />
      <path fill="#C47A52" d="M41 9h17v36L49 55H41z" />
      <path fill="#C4A486" d="M49 55 58 45h-9z" />
      <path
        d="M49 55 58 45"
        stroke="#1F1F1F"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path
        d="M5 56.8h44"
        stroke="#1F1F1F"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}
