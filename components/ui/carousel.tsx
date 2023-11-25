/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Carousel as NativeCarousel } from "@fancyapps/ui"
import { ComponentOptionsType as FancyboxOptionsType } from "@fancyapps/ui/types/Carousel/options"
import * as React from "react"
import { useMergedRefs } from "@/hooks/use-merged-refs"
import { cn } from "@/lib/utils"
import { ZoomImageProps, ZoomImg } from "./zoom-img"

// @ts-ignore
const { Autoplay } = typeof window !== "undefined" ? require("@fancyapps/ui/dist/carousel/carousel.autoplay.esm") : {}
// @ts-ignore
const { Thumbs } = typeof window !== "undefined" ? require("@fancyapps/ui/dist/carousel/carousel.thumbs.esm") : {}

interface Props {
  children?: React.ReactNode
  options?: Partial<FancyboxOptionsType> & {
    Autoplay?: {
      timeout: number
      hoverPause: boolean
      showProgress: boolean
    } | boolean
    Dots?: boolean
    Navigation?: boolean
  }
  className?: string
}

export const Carousel = React.forwardRef<HTMLDivElement, Props>(({ children, options = {}, className }, ref) => {
  const containerRef = React.useRef(null)
  const refs = useMergedRefs(containerRef, ref)

  React.useEffect(() => {
    const container = containerRef.current

    const instance = new NativeCarousel(container, options, { Autoplay, Thumbs })

    return () => {
      instance.destroy()
    }
  }, [])

  return (
    <div ref={refs} aria-label="carousel" className={cn("f-carousel", className)}>
      {children}
    </div>
  )
})

Carousel.displayName = "Carousel"

type SlideProps = {
  children?: React.ReactNode
  enableZoom?: boolean
  className?: string
  zoomImgProps?: ZoomImageProps
}

export function CarouselSlide({ children, enableZoom, className, zoomImgProps }: SlideProps) {
  return React.cloneElement(
    enableZoom ? <ZoomImg {...zoomImgProps} /> : <div />,
    {
      className: cn("f-carousel__slide", className),
    },
    children
  )
}
