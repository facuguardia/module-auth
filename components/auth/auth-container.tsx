import { type ReactNode } from "react"

interface AuthContainerProps {
  children: ReactNode
  className?: string
}

export function AuthContainer({ children, className = "" }: AuthContainerProps) {
  return (
    <div className="min-h-screen grid place-items-center bg-slate-50 dark:bg-slate-950">
      <div className={`w-full max-w-md p-6 space-y-6 bg-white dark:bg-slate-900 rounded-lg shadow-lg ${className}`}>
        {children}
      </div>
    </div>
  )
}