import { wrap } from "framer-motion"
import _ from "lodash"
import * as React from "react"
import { useUpdateEffect } from "react-use"

export type ReactRef<T> = React.RefObject<T> | React.MutableRefObject<T> | React.Ref<T> | React.RefCallback<T>

export interface UseAnimateListProps {
  direction?: number
  maxItem?: number
  minItem?: number
  onValueChange?: (value: number) => void
  control?: ReactRef<any> | any
  value?: number
  infinite?: boolean
}

export function useAnimateList({
  minItem = 0,
  maxItem,
  value: _page = 0,
  direction: _direction = 0,
  control,
  onValueChange,
  infinite = true,
}: UseAnimateListProps = {}) {
  const [[page, direction], setPage] = React.useState<[number, number]>([_page, _direction])

  useUpdateEffect(() => {
    if (_.isNumber(_page)) {
      setPage([_page, direction])
    }
  }, [_page])

  useUpdateEffect(() => {
    if (_.isNumber(_direction)) {
      setPage([page, _direction])
    }
  }, [_direction])

  const _max = maxItem ? maxItem : _page + 1

  const pageIndex = infinite ? wrap(minItem, _max, page) : page >= _max ? _max : page

  const paginate = (newDirection: number) => {
    const result = page + newDirection

    setPage([result, newDirection])
    onValueChange?.(result)
  }

  const result = {
    page: pageIndex,
    direction,
    paginate,
  } as const

  if (_.isFunction(control)) {
    control(result)
  } else if (!_.isNil(control) && _.has(control, "current")) {
    _.assign(control, { current: result })
  }

  return result
}

export type UseAnimateListReturn = ReturnType<typeof useAnimateList>
