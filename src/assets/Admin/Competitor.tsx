import { SVGProps } from 'react';

export function Competitor(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M19 21H4q-.625 0-.888-.537t.088-1.038l4.7-6.6q.275-.4.7-.612T9.525 12h4.025l5.7-6.65q.45-.525 1.1-.288T21 6v13q0 .825-.587 1.413T19 21M7.5 10l-3.1 4.375q-.25.35-.65.413T3 14.6t-.412-.65t.187-.75L5.9 8.85q.275-.4.7-.625T7.525 8h4.025l4.05-4.725q.275-.325.675-.35t.725.25t.35.675t-.25.725L13.05 9.3q-.275.35-.675.525T11.55 10z"
      />
    </svg>
  );
}
