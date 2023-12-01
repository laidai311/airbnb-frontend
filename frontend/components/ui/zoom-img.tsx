/* eslint-disable jsx-a11y/anchor-has-content */
import * as React from "react"

export type ZoomImageProps = React.ComponentProps<"a"> & {
  children?: React.ReactElement
  galleryID?: string
  enabled?: boolean
}

export const ZoomImg = ({ galleryID = "not-id", children, enabled = true, ...props }: ZoomImageProps) => {
  const href = children ? children.props?.src : "#"

  return React.cloneElement(
    enabled ? <a href={href} {...props} data-fancybox={galleryID} /> : <React.Fragment />,
    undefined,
    children
  )
}
