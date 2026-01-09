import { cva, VariantProps } from "class-variance-authority";
import {
  Ban,
  ChefHat,
  CircleCheckBig,
  Clock4,
  Eye,
  SoupIcon,
  Train,
  X,
} from "lucide-react";
import { forwardRef, HTMLAttributes } from "react";

const iconVariants = cva("p-4 rounded-full", {
  variants: {
    color: {
      "accent-with-white": "bg-accent text-off-white",
      "dark-with-light": "bg-dark-gray text-light-gray",
      "dark-with-accent": "bg-dark-gray text-accent",
      "dark-with-danger": "bg-dark-gray text-danger",
    },
    size: {
      lg: "w-16 h-16",
      base: "w-14 h-14",
    },
  },
  defaultVariants: {
    color: "accent-with-white",
    size: "base",
  },
});

enum AppIcon {
  Train,
  Clock,
  Eye,
  ChefHat,
  Soup,
  CircleCheck,
  Ban,
  X,
}

interface IconProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof iconVariants> {
  icon: AppIcon;
}

const Icon = forwardRef<HTMLDivElement, IconProps>(
  ({ className, icon, color, size, ...props }, ref) => {
    icon;

    const LucideIcon = () => {
      const sizeVariant = iconVariants({ size });

      switch (icon) {
        case AppIcon.Train:
          return <Train className={sizeVariant} />;
        case AppIcon.Clock:
          return <Clock4 className={sizeVariant} />;
        case AppIcon.Soup:
          return <SoupIcon className={sizeVariant} />;
        case AppIcon.ChefHat:
          return <ChefHat className={sizeVariant} />;
        case AppIcon.CircleCheck:
          return <CircleCheckBig className={sizeVariant} />;
        case AppIcon.X:
          return <X className={sizeVariant} />;
        case AppIcon.Ban:
          return <Ban className={sizeVariant} />;
        case AppIcon.Eye:
          return <Eye className={sizeVariant} />;
      }
    };

    // add cn if more variants
    return (
      <div className={iconVariants({ color })} ref={ref} {...props}>
        <LucideIcon />
      </div>
    );
  },
);

export { Icon };
