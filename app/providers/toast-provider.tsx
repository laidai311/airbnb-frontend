"use-client"

import { Toaster } from "react-hot-toast"

export const ReactHotToastProvider = () => {
  return (
    <Toaster
      position="top-center"
      gutter={12}
      reverseOrder={false}
      containerStyle={{ top: "calc(var(--header) + 12px)" }}
      toastOptions={{
        duration: 5000,
        className: "!bg-toast !text-toast-foreground",
      }}
    />
  )
}
