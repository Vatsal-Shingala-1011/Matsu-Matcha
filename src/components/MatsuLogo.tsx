export default function MatsuLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      viewBox="0 0 160 30"
      fill="none"
      className={className}
    >
      <text
        x="50%"
        y="24"
        textAnchor="middle"
        fontFamily="var(--font-instrument-serif), serif"
        fontSize="42"
        fill="currentColor"
        letterSpacing="4"
      >
        matsu
      </text>
    </svg>
  );
}
