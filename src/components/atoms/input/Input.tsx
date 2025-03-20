import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  htmlFor: string;
  errorMessage?: string | undefined;
}

const Input = forwardRef(
  (
    { htmlFor, label, errorMessage, ...props }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <label htmlFor={htmlFor} className="relative">
        <p className="font-bold text-sm mb-2">{label}</p>
        <input
          ref={ref}
          {...props}
          className={`
          w-full
          px-4
          py-2
          rounded-md
          border-solid
          border-[#ddd]
          border-2
          ${errorMessage ? "border-red-900" : "border-[#ddd]"}
          ${props.className}
        `}
          id={htmlFor}
        />
        {errorMessage && (
          <p className="text-red-700 absolute ">{errorMessage}</p>
        )}
      </label>
    );
  }
);

Input.displayName = "Input";

export { Input };
