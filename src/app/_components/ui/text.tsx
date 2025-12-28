import { cva, type VariantProps } from "class-variance-authority";
import {
  forwardRef,
  type ElementType,
  type ComponentPropsWithoutRef,
  ReactElement,
} from "react";
import { cn } from "~/lib/utils/cn";

const textVariants = cva("text-neutral-300", {
  variants: {
    variant: {
      // Headings
      "heading-1": "text-xl font-bold",
      "heading-2": "text-xl",
      "heading-3": "text-base",

      // Body text
      body: "text-base",
      "body-sm": "text-sm",

      // Specialized
      price: "text-green-600 font-medium",
      "price-lg": "text-2xl text-green-600",
      muted: "text-neutral-400",
      badge: "text-xs font-semibold",
      error: "text-sm text-red-500",
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
      muted: "text-neutral-400",
      accent: "text-green-600",
      "accent-light": "text-green-500",
      error: "text-red-500",
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

const Text = forwardRef(
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

export { Text };
