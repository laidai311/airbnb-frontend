"use client"

import { Fancybox as NativeFancybox } from "@fancyapps/ui"
import { ComponentOptionsType as FancyboxOptionsType } from "@fancyapps/ui/types/Fancybox/options"
import React, { useEffect, useRef } from "react"

interface Props {
  children?: React.ReactNode
  delegate?: string
  options?: Partial<FancyboxOptionsType>
}

export default function FancyboxProvider({ delegate = "[data-fancybox]", options = {}, children }: Props) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current

    NativeFancybox.bind(container, delegate, options)

    return () => {
      NativeFancybox.unbind(container)
      NativeFancybox.close()
    }
  }, [])

  return (
    <div aria-label="fancybox" ref={containerRef}>
      {children}
    </div>
  )
}
