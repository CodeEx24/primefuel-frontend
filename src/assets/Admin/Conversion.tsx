import { SVGProps } from 'react';

export function Conversion(props: SVGProps<SVGSVGElement>) {
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
        d="M2 22v-2h2.55q-1.2-.575-1.937-1.7t-.738-2.55q0-1.975 1.388-3.363T6.625 11v2q-1.125 0-1.937.8t-.813 1.95q0 .975.6 1.725t1.525.95V16h2v6zM7 9h10V7H7zm3 12v-4h4v-2h-4v-2h7v-2h-7V9H3V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21z"
      />
    </svg>
  );
}
