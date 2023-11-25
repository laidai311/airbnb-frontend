import { PackageOpenIcon } from "lucide-react"
import React from "react"

function Description(props: { description?: React.ReactNode }) {
  const { description } = props
  return (
    <div className="flex flex-col justify-center space-y-4">
      <div className="flex justify-center">
        <PackageOpenIcon className="h-12 w-12 opacity-50" />
      </div>
      <div className="px-6 text-center text-sm">{description}</div>
    </div>
  )
}

export { Description }
