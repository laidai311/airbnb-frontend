/* eslint-disable jsx-a11y/alt-text */
import _ from "lodash"
import Image, { ImageProps } from "next/image"
import * as React from "react"
import { cn } from "@/lib/utils"
import { AspectRatio } from "./aspect-ratio"

const ratioOptions = {
  "1:1": 1,
  "4:3": 4 / 3,
  "16:9": 16 / 9,
  "21:9": 21 / 9,
} as const // 👈️ use const assertion

// 👇️ type Keys = "1:1" | "4:3" | "16:9" | ...
type KeysRatio = keyof typeof ratioOptions

export type ImgProps = ImageProps & {
  className?: string
  ratio?: number | KeysRatio
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down"
  style?: React.CSSProperties
}

export const Img = ({ className, ratio, objectFit = "cover", style = {}, ...others }: ImgProps) => {
  const _ratio = typeof ratio === "number" ? ratio : _.get(ratioOptions, ratio as KeysRatio)

  return React.cloneElement(
    _ratio ? (
      <AspectRatio ratio={_ratio} className={className} />
    ) : (
      <div className={cn("relative overflow-hidden", className)} />
    ),
    undefined,
    <Image
      fill={!_.has(others, "width") || !_.has(others, "height")}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      style={{
        objectFit: objectFit,
        userSelect: "none",
        ...style
      }}
      placeholder={"blur"}
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
      {...others}
    />
  )
}
