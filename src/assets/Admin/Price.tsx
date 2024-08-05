import { SVGProps } from 'react';

export function Price(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 512 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M288 16L0 304l176 176l288-288V16Zm80 128a32 32 0 1 1 32-32a32 32 0 0 1-32 32"
      />
      <path
        fill="currentColor"
        d="M480 64v144L216.9 471.1L242 496l270-272V64z"
      />
    </svg>
  );
}
