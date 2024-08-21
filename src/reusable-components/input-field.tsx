import { forwardRef, InputHTMLAttributes } from "react";
import Error from "../assets/svg/error.svg";
import clsx from "clsx";

const fieldSizes: Record<Sizes, string> = {
  small: "w-78 h-8 px-2  gap-2 rounded-2xl ",
  medium: "w-78 h-10 gap-3 rounded-2xl ",
  large: "w-96 h-10 px-5  gap-4 rounded-3xl ",
};
const status: Record<Status, string> = {
  error: "border-solid border-2 border-red-600	",
  normal: "",
};
interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  svg?: string;
  error?: string;
  classes?: string;
  fieldsize?: Sizes;
}
type Sizes = "small" | "medium" | "large";
type Status = "error" | "normal";
export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (props, ref) => {
    const {
      fieldsize: fieldSize = "medium",
      svg = "",
      error = "",
      placeholder = "",
      type = "text",
      classes,
      defaultValue,
      onKeyDown,
      ...rest
    } = props;
    const customClasses = `bg-white flex items-center gap-2 py-2 ps-1 text-right justify-start border-solid border-2 border-gray-300 ${classes} ${fieldSizes[fieldSize]}`;
    if (error) {
      customClasses.concat(` ${status["error"]}`);
    }
    return (
      <div className="w-full">
        <div className={customClasses}>
          {svg && <img src={svg} className="m-1 h-7" alt="" />}
          <input
            defaultValue={defaultValue}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
              onKeyDown?.(e);
            }}
            type={type}
            className="grow border-none px-3 focus:border-none focus:outline-none"
            ref={ref}
            placeholder={placeholder}
            {...rest}
          ></input>
        </div>
        <div
          className={clsx(
            "h-5 scale-0",
            !!error &&
              "mt-2 flex scale-100 items-center justify-start ps-2 transition-all",
          )}
        >
          <img src={Error} className="m-2 h-full" alt="" />
          <span className="w-fit grow text-start text-xs text-red-600">
            {error}
          </span>
        </div>
      </div>
    );
  },
);
