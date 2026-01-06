import { cva, type VariantProps } from "class-variance-authority";
import {
  forwardRef,
  type ElementType,
  type ComponentPropsWithoutRef,
  ReactElement,
} from "react";
import { cn } from "~/lib/utils";

const textVariants = cva("text-off-white font-body", {
  variants: {
    variant: {
      // Headings
      "heading-1": "text-xl font-bold font-heading",
      "heading-2": "text-xl font-heading",
      "heading-3": "text-base font-heading",

      // Body text
      body: "text-base",
      "body-sm": "text-sm",

      // Specialized
      price: "text-accent font-medium",
      "price-lg": "text-2xl text-accent",
      muted: "text-slate",
      badge: "text-xs font-semibold",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    color: {
      muted: "text-slate",
      accent: "text-accent",
      "accent-light": "text-light-accent",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

// Invariant: "as" defines what props Text should have

type propsOf<T extends ElementType> = ComponentPropsWithoutRef<T>;
type polymorphicRef<T extends ElementType> = ComponentPropsWithoutRef<T>["ref"];

type TextProps<T extends ElementType = "span"> = Omit<propsOf<T>, "color"> & {
  as?: T;
} & VariantProps<typeof textVariants>;

type TextComponent = <T extends ElementType = "span">(
  props: TextProps<T> & { ref?: polymorphicRef<T> },
) => ReactElement | null;

const Typography = forwardRef(
  <T extends ElementType = "span">(
    { as, className, variant, size, weight, color, ...props }: TextProps<T>,
    ref: polymorphicRef<T>,
  ) => {
    const Comp = as ?? "span";

    return (
      <Comp
        className={cn(
          textVariants({ variant, size, weight, color }),
          className,
        )}
        ref={ref}
        {...props}
      ></Comp>
    );
  },
) as TextComponent;

export { Typography };
