import React, { forwardRef, ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

// Define the Button component
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          "w-full rounded-full bg-green-500 border-transparent px-3 disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold hover:opacity-75 transition",
          className
        )}
        {...props} // Spread all native button props
      >
        {children}
      </button>
    );
  }
);

// Add display name for better debugging
Button.displayName = "Button";

export default Button;
