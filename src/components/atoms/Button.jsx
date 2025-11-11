import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Button = forwardRef(({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  ...props
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"

  const variants = {
    primary: "bg-primary-600 hover:bg-primary-700 text-white shadow-sm hover:shadow-md focus:ring-primary-500 active:bg-primary-800",
    secondary: "bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-sm hover:shadow-md focus:ring-primary-500 active:bg-slate-100",
    outline: "border border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500 active:bg-primary-100",
    ghost: "text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:ring-slate-300 active:bg-slate-200",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-sm hover:shadow-md focus:ring-red-500 active:bg-red-800",
    success: "bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow-md focus:ring-green-500 active:bg-green-800"
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg"
  }

  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button"

export default Button