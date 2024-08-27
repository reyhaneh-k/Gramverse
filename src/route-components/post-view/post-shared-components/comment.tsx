import { MouseEventHandler } from "react";

type CommentProps = {
  onClick: MouseEventHandler<SVGSVGElement>;
  count?: number | undefined;
};
export const Comment = ({ count }: CommentProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        width="22"
        height="22"
        viewBox="-1 0 22 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="9"
          cy="9"
          r="10"
          transform="matrix(1 0 0 -1 2.5 20.4424)"
          stroke="#EA5A69"
          strokeWidth="2"
        />
        <path
          d="M4.20649 18.2353L2.905 16.9338L2.52135 18.7339L3.49939 18.9424L2.52133 18.734L2.5213 18.7342L2.52116 18.7348L2.52063 18.7373L2.51859 18.7469L2.51073 18.7839L2.48108 18.9239C2.45562 19.0445 2.41936 19.2166 2.37614 19.4236C2.28975 19.8373 2.17529 20.391 2.06341 20.9493C1.95185 21.5059 1.84151 22.0739 1.76413 22.5135C1.72579 22.7313 1.6934 22.9297 1.67326 23.0835C1.66355 23.1576 1.65407 23.2407 1.64993 23.3178C1.648 23.3539 1.6457 23.4142 1.65013 23.4829C1.65232 23.5168 1.65744 23.575 1.67242 23.6444C1.68336 23.6951 1.71885 23.8502 1.83218 24.0132C2.01052 24.2697 2.25214 24.3714 2.39373 24.4105C2.53338 24.4491 2.65048 24.4492 2.71071 24.4468C2.83234 24.4421 2.93039 24.4169 2.97178 24.4057C3.06825 24.3796 3.16119 24.3429 3.22729 24.3155C3.37084 24.2558 3.54949 24.1706 3.7366 24.0774C4.11727 23.8877 4.60771 23.6271 5.08538 23.3681C5.56537 23.1078 6.04169 22.8441 6.39742 22.6458C6.57544 22.5466 6.72362 22.4636 6.82741 22.4053L6.94804 22.3374L6.98002 22.3194L6.98833 22.3147L6.99049 22.3135L6.99107 22.3132L6.99123 22.3131L6.49939 21.4424L6.9913 22.313L8.40771 21.5128L7.05409 20.6103L5.63647 19.6653L4.20649 18.2353Z"
          stroke="#EA5A69"
          strokeWidth="2"
        />
      </svg>
      <small>{count}</small>
    </div>
  );
};
