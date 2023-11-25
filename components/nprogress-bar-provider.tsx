"use client"

import { AppProgressBar } from "next-nprogress-bar"

export function NProgressBarProvider() {
  return <AppProgressBar height="3px" color="#ffcc00" options={{ showSpinner: false }} shallowRouting />
}
