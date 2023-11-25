import _ from "lodash"
import * as React from "react"
import { useAnimateListContext } from "./animate-list-context"
import { UseAnimateListReturn } from "./use-animate-list"

export interface AnimateItemProps {
  children: React.ReactNode | ((value: UseAnimateListReturn) => React.ReactNode)
  value: number
}

export function AnimateItem({ value, children }: AnimateItemProps) {
  const context = useAnimateListContext()

  return _.isEqual(context.page, value) ? (_.isFunction(children) ? children(context) : children) : null
}
