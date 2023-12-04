"use client"

import { UseInfiniteQueryResult } from "@tanstack/react-query"
import { useWindowVirtualizer, VirtualizerOptions } from "@tanstack/react-virtual"
import _ from "lodash"
import { useTranslations } from "next-intl"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Spinner } from "./spinner"

type Props<T> = UseInfiniteQueryResult<any> & {
  dataList: T[]
  itemClassName?: string
  renderEmpty?: (() => React.ReactNode) | React.ReactNode
  renderError?: ((value: { error: any }) => React.ReactNode) | React.ReactNode
  renderItem?: (value: { item: T; index: number }) => React.ReactNode
  renderLoading?: (() => React.ReactNode) | React.ReactNode
  total?: number
  virtualizerOptions?: Omit<
    VirtualizerOptions<Window, any>,
    | "count"
    | "estimateSize"
    | "getScrollElement"
    | "observeElementOffset"
    | "observeElementRect"
    | "scrollMargin"
    | "scrollToFn"
  >
}

export function WindowVirtualizer<T = any>({
  dataList,
  error,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  itemClassName,
  renderEmpty,
  renderError,
  renderItem,
  renderLoading,
  status,
  total,
  virtualizerOptions = {},
}: Props<T>) {
  const t = useTranslations("Page")
  const parentOffsetRef = React.useRef<number>()
  const parentRef = React.useRef<HTMLDivElement>(null)

  const virtualizer = useWindowVirtualizer({
    count: total || 0,
    estimateSize: () => 200,
    scrollMargin: parentOffsetRef.current,
    ...virtualizerOptions,
  })

  const items = virtualizer.getVirtualItems()

  React.useLayoutEffect(() => {
    parentOffsetRef.current = parentRef.current?.offsetTop ?? 0
  }, [parentRef.current?.offsetTop])

  React.useEffect(() => {
    const [lastItem] = [...virtualizer.getVirtualItems()].reverse()

    if (!lastItem) {
      return
    }

    if (lastItem.index >= dataList.length - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasNextPage, fetchNextPage, dataList.length, isFetchingNextPage, virtualizer.getVirtualItems()])

  React.useEffect(() => {
    document.documentElement.style.overflowAnchor = "none"
    document.body.style.overflowAnchor = "none"
    return () => {
      document.documentElement.style.overflowAnchor = ""
      document.body.style.overflowAnchor = ""
    }
  }, [])

  return status === "loading" ? (
    _.isFunction(renderLoading) ? (
      renderLoading()
    ) : (
      renderLoading || (
        <div className="my-6 flex justify-center">
          <Spinner />
        </div>
      )
    )
  ) : status === "error" ? (
    _.isFunction(renderError) ? (
      renderError({ error })
    ) : (
      renderError || <div className="my-6 text-center">{(error as Error)?.message}</div>
    )
  ) : (
    <div aria-label="virtualizer" ref={parentRef}>
      {_.isEmpty(dataList) ? (
        _.isFunction(renderEmpty) ? (
          renderEmpty()
        ) : (
          renderEmpty || <div className="my-6 text-center">{t("No result")}</div>
        )
      ) : (
        <>
          <div
            aria-label="virtualizer-list"
            style={{
              height: virtualizer.getTotalSize(),
              width: "100%",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${items[0] ? items[0].start - virtualizer.options.scrollMargin : 0}px)`,
              }}
            >
              {items.map((virtualRow) => {
                const isLoaderRow = virtualRow.index > dataList.length - 1
                const data = dataList[virtualRow.index]

                return (
                  <div
                    key={virtualRow.key}
                    data-index={virtualRow.index}
                    ref={virtualizer.measureElement}
                    className={cn(itemClassName)}
                  >
                    {isLoaderRow ? (
                      hasNextPage ? (
                        _.isFunction(renderLoading) ? (
                          renderLoading()
                        ) : (
                          renderLoading || (
                            <div className="my-6 flex justify-center">
                              <Spinner />
                            </div>
                          )
                        )
                      ) : (
                        <div>{t("Nothing more to load")}</div>
                      )
                    ) : (
                      renderItem?.({ item: data, index: virtualRow.index })
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {hasNextPage
            ? null
            : _.isFunction(renderEmpty)
            ? renderEmpty()
            : renderEmpty || <div className="mt-16 text-center ">{t("No result")}</div>}
        </>
      )}
    </div>
  )
}
