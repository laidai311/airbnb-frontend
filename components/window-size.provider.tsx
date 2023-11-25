"use client"

import * as React from "react"
import useDetectKeyboard from "@/hooks/use-detect-keyboard"
import { isMobile } from "@/lib/assertion-utils"

function WindowSizeProvider() {
  const isDetectKeyboardOpen = useDetectKeyboard()

  React.useEffect(() => {
    const listener = () => {
      if (isDetectKeyboardOpen && isMobile()) return
      document.documentElement.style.setProperty("--window-height", `${window.innerHeight}px`)
      document.documentElement.style.setProperty("--window-width", `${window.innerWidth}px`)
    }
    listener()

    window.addEventListener(
      "orientationchange",
      function () {
        // Generate a resize event if the device doesn't do it
        window.dispatchEvent(new Event("resize"))
      },
      false
    )

    window.addEventListener("resize", listener)
    return () => {
      window.removeEventListener("resize", listener)
    }
  }, [isDetectKeyboardOpen])

  return undefined
}

export { WindowSizeProvider }
