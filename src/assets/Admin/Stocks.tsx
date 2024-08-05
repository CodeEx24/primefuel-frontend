import { SVGProps } from 'react';

export function Stocks(props: SVGProps<SVGSVGElement>) {
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
        d="M5.616 21q-.672 0-1.144-.472T4 19.385V8.263q-.43-.178-.715-.577Q3 7.286 3 6.769V4.615q0-.67.472-1.143Q3.944 3 4.616 3h14.769q.67 0 1.143.472q.472.472.472 1.144v2.153q0 .517-.285.916q-.284.4-.715.578v11.122q0 .67-.472 1.143q-.472.472-1.143.472zm-1-13.615h14.769q.269 0 .442-.174Q20 7.038 20 6.77V4.615q0-.269-.173-.442T19.385 4H4.615q-.269 0-.442.173T4 4.616v2.153q0 .27.173.442q.173.173.443.173m5.211 5.482h4.365q.195 0 .309-.125q.115-.124.115-.318t-.115-.308t-.309-.115H9.808q-.194 0-.309.115q-.114.114-.114.308t.124.318t.318.125"
      />
    </svg>
  );
}
