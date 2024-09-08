import React from "react";
import { cn } from "@/lib/utils";
import "@/assets/css/fonts.css";

export interface RoundedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const RoundedButton = React.forwardRef<HTMLButtonElement, RoundedButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className={cn(
          `w-32 h-10 flex items-center justify-center
          rounded-full border-primary/10 border bg-secondary font-light text-primary
          active:bg-secondary/70 active:text-primary/70 disabled:bg-secondary/70 disabled:text-primary/70
          transition-all duration-100 ease-in-out`,
          className
        )}
        style={{ fontFamily: "MiSans" }}>
        {children}
      </button>
    );
  }
);
RoundedButton.displayName = "Button";

export { RoundedButton };
