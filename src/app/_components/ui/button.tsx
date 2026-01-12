import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "~/lib/utils/client";

const buttonVariants = cva(
  "inline-flex text-off-white justify-center items-center transition-all disabled:cursor-not-allowed disabled:opacity-50 disabled:transition-none group shadow-lg font-heading",
  {
    variants: {
      variant: {
        primary: "bg-accent active:bg-dark-accent active:text-slate",
        secondary: "bg-dark-gray active:bg-dark active:text-slate",
        ternary: "bg-light-gray active:bg-gray active:text-slate",
        destructive: "bg-gray active:bg-danger-dark active:text-slate",
        danger: "bg-danger active:bg-danger-dark active:text-slate",
        increment: "bg-accent active:bg-dark-accent active:text-slate",
        decrement: "bg-dark active:bg-off-black active:text-slate",
        ghost: "text-accent active:text-dark-accent",
        toggle:
          "bg-dark-gray data-[active=true]:bg-accent data-[active=true]:text-dark-gray shadow-mb",
      },
      size: {
        default: "px-4 py-3",
        sm: "px-3 py-2 text-sm",
        lg: "px-6 py-4 text-lg",
        icon: "w-8 h-8",
        "icon-lg": "w-10 h-10 text-3xl",
      },
      rounded: {
        none: "",
        default: "rounded-lg",
        full: "rounded-full",
        xl: "rounded-xl",
      },
      active: {
        true: "active:scale-105 disabled:active:scale-100",
        intense: "active:scale-110 disabled:active:scale-100",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      rounded: "default",
      active: true,
    },
  },
);

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, rounded, active, asChild = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, rounded, active, className }),
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button };
