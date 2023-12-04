export function isMobile(defaultValue = false) {
  if (typeof window === "undefined") return defaultValue
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent)
}
