import { cva, type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "~/lib/utils/cn";

const buttonVariants = cva(
  "inline-flex text-neutral-300 items-center justify-center transition-all disabled:cursor-not-allowed disabled:opacity-50 disabled:transition-none group shadow-lg",
  {
    variants: {
      variant: {
        primary: "bg-green-600 active:bg-green-700 active:text-neutral-400",
        secondary:
          "bg-neutral-800 active:bg-neutral-900 active:text-neutral-400",
        destructive:
          "bg-neutral-700 hover:bg-red-600 active:bg-red-700 active:text-neutral-400",
        increment: "bg-green-600 active:bg-green-700 active:text-neutral-400",
        decrement:
          "bg-neutral-900 active:bg-neutral-950 active:text-neutral-400",
        ghost: "text-green-600 active:text-green-700",
        toggle:
          "bg-neutral-800 data-[active=true]:bg-green-600 data-[active=true]:text-neutral-800 shadow-mb",
      },
      size: {
        default: "px-4 py-3",
        sm: "px-3 py-2 text-sm",
        lg: "px-6 py-4 text-lg",
        icon: "w-8 h-8",
        "icon-lg": "w-10 h-10 text-3xl",
      },
      rounded: {
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
