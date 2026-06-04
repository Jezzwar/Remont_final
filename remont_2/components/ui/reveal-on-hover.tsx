"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CardHoverRevealContextValue {
  isHovered: boolean
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>
}
const CardHoverRevealContext = React.createContext<CardHoverRevealContextValue>(
  {} as CardHoverRevealContextValue
)
const useCardHoverRevealContext = () => {
  const context = React.useContext(CardHoverRevealContext)
  if (!context) throw new Error("useCardHoverRevealContext must be used within a CardHoverRevealProvider")
  return context
}

const CardHoverReveal = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)
    return (
      <CardHoverRevealContext.Provider value={{ isHovered, setIsHovered }}>
        <div
          ref={ref}
          className={cn("relative overflow-hidden", className)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          {...props}
        />
      </CardHoverRevealContext.Provider>
    )
  }
)
CardHoverReveal.displayName = "CardHoverReveal"

const CardHoverRevealMain = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { initialScale?: number; hoverScale?: number }
>(({ className, initialScale = 1, hoverScale = 1.05, ...props }, ref) => {
  const { isHovered } = useCardHoverRevealContext()
  return (
    <div
      ref={ref}
      className={cn("size-full transition-transform duration-300", className)}
      style={{ transform: `scale(${isHovered ? hoverScale : initialScale})`, ...props.style }}
      {...props}
    />
  )
})
CardHoverRevealMain.displayName = "CardHoverRevealMain"

const CardHoverRevealContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { isHovered } = useCardHoverRevealContext()
    return (
      <div
        ref={ref}
        className={cn("absolute inset-[auto_1.5rem_1.5rem] p-6 backdrop-blur-lg transition-all duration-500 ease-in-out", className)}
        style={{ translate: isHovered ? "0%" : "0% 120%", opacity: isHovered ? 1 : 0, ...props.style }}
        {...props}
      />
    )
  }
)
CardHoverRevealContent.displayName = "CardHoverRevealContent"

export { CardHoverReveal, CardHoverRevealMain, CardHoverRevealContent }
