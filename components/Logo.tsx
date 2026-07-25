export default function Logo({ size = 40, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="280 180 220 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="ZULOO Logo"
    >
      <path
        d="M 320 200 L 460 200 L 340 320 L 460 320
           A 20 20 0 0 1 480 340 L 480 360
           A 20 20 0 0 1 460 380 L 320 380
           L 440 260 L 320 260
           A 20 20 0 0 1 300 240 L 300 220
           A 20 20 0 0 1 320 200 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="24"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
