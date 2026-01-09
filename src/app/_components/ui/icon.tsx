import { cva, VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";
import { forwardRef, HTMLAttributes } from "react";
import { cn } from "~/lib/utils";

const divVariants = cva("p-4 rounded-full", {
  variants: {
    color: {
      "accent-with-white": "bg-accent text-off-white",
      "dark-with-light": "bg-dark-gray text-light-gray",
      "dark-with-accent": "bg-dark-gray text-accent",
      "dark-with-danger": "bg-dark-gray text-danger",
    },
  },
  defaultVariants: {
    color: "accent-with-white",
  },
});

const iconVariants = cva("", {
  variants: {
    size: {
      lg: "w-16 h-16",
      base: "w-14 h-14",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

interface IconProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof iconVariants>,
    VariantProps<typeof divVariants> {
  Icon: LucideIcon;
}

const Icon = forwardRef<HTMLDivElement, IconProps>(
  ({ className, Icon, color, size, ...props }, ref) => {
    return (
      <div
        className={cn(divVariants({ color, className }))}
        ref={ref}
        {...props}
      >
        <Icon className={iconVariants({ size })} />
      </div>
    );
  },
);

Icon.displayName = "icon";

export { Icon };
