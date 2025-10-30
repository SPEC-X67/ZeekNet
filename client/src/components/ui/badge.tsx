import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        seekrPending: "border-transparent bg-[#fef3c7] text-[#d97706] [a&]:hover:bg-[#fde68a]/90",
        seekrAccepted: "border-transparent bg-[#d1fae5] text-[#059669] [a&]:hover:bg-[#a7f3d0]/90",
        seekrRejected: "border-transparent bg-[#fee2e2] text-[#dc2626] [a&]:hover:bg-[#fecaca]/90",
        seekrInterviewed: "border-transparent bg-[#dbeafe] text-[#2563eb] [a&]:hover:bg-[#bfdbfe]/90",
        seekrOffered: "border-transparent bg-[#e0e7ff] text-[#4338ca] [a&]:hover:bg-[#c7d2fe]/90",
        seekrHired: "border-transparent bg-[#dcfce7] text-[#16a34a] [a&]:hover:bg-[#bbf7d0]/90",
        seekrDeclined: "border-transparent bg-[#f3f4f6] text-[#6b7280] [a&]:hover:bg-[#e5e7eb]/90",
        skill: "bg-[#f8f8fd] text-[#4640de] px-2 py-1 text-[13px] font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge }
