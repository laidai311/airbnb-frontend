import { useEffect, useState } from "react"

const useDetectKeyboard = (minKeyboardHeight = 300, defaultValue = false) => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(defaultValue)

  useEffect(() => {
    const listener = () => {
      const newState = window.screen.height - minKeyboardHeight > (window.visualViewport?.height || 0)
      if (isKeyboardOpen != newState) {
        setIsKeyboardOpen(newState)
      }
    }
    if (typeof visualViewport != "undefined" && window.visualViewport) {
      window.visualViewport.addEventListener("resize", listener)
    }

    return () => {
      if (typeof visualViewport != "undefined") {
        window.visualViewport && window.visualViewport.removeEventListener("resize", listener)
      }
    }
  }, [])

  return isKeyboardOpen
}

export default useDetectKeyboard
