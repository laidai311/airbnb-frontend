import { Loader2Icon, LucideProps } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoaderProps {
  spinning?: boolean
  className?: string
  iconProps?: LucideProps
}

export const Spinner: React.FC<LoaderProps> = ({ spinning = true, className = "", iconProps }) => {
  return spinning && <Loader2Icon size={20} className={cn("mr-2 animate-spin", className)} {...iconProps} />
}
