import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const SliderHighlight = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-4 w-full grow overflow-hidden rounded-sm bg-primary/20">
      <SliderPrimitive.Range className="absolute h-full bg-highlight" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-8 w-4 rounded-sm border border-highlight/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-highlight disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
SliderHighlight.displayName = SliderPrimitive.Root.displayName

export { SliderHighlight }
