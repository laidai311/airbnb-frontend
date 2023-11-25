"use client"

// import { LocaleToggle } from "./locale-toggle"
import { ModeToggle } from "./mode-toggle"

interface Props {
  className?: string
}

export function PageHeader({ className }: Props) {
  return (
    <div className={className}>
      <div className="container">
        <div className="h-header flex items-center justify-between">
          <div>Logo</div>
          <ModeToggle />
          {/* <LocaleToggle /> */}
        </div>
      </div>
    </div>
  )
}
