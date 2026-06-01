import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg" | "icon";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium tracking-tight transition-all duration-200 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none select-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-neon text-[#04070e] font-semibold hover:brightness-110 hover:shadow-[0_0_34px_-4px_var(--color-neon)] active:brightness-95",
  secondary:
    "panel text-ink hover:border-neon/60 hover:text-neon hover:shadow-[0_0_26px_-10px_var(--color-neon)]",
  outline:
    "border border-line text-ink hover:border-neon/60 hover:text-neon hover:bg-white/[0.03]",
  ghost: "text-muted hover:text-ink hover:bg-white/[0.06]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[0.95rem]",
  icon: "h-10 w-10 rounded-lg",
};

export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={buttonVariants({ variant, size, className })} {...props} />
  );
}
