import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Badge = forwardRef(({
  children,
  variant = "default",
  size = "sm",
  color = "",
  className = "",
  ...props
}, ref) => {
  const baseStyles = "inline-flex items-center font-medium rounded-full transition-all duration-200"

  const variants = {
    default: "bg-slate-100 text-slate-800 hover:bg-slate-200",
    primary: "bg-primary-100 text-primary-800 hover:bg-primary-200",
    success: "bg-green-100 text-green-800 hover:bg-green-200",
    warning: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    error: "bg-red-100 text-red-800 hover:bg-red-200",
    custom: ""
  }

  const sizes = {
    xs: "px-2 py-0.5 text-xs",
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-sm"
  }

  const customStyle = color ? {
    backgroundColor: `${color}1a`, // 10% opacity
    color: color,
  } : {}

  return (
    <span
      ref={ref}
      className={cn(
        baseStyles,
        color ? variants.custom : variants[variant],
        sizes[size],
        className
      )}
      style={customStyle}
      {...props}
    >
      {children}
    </span>
  )
})

Badge.displayName = "Badge"

export default Badge