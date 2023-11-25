import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Table as ReactTable,
  RowData,
  SortingState,
  TableOptions,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import _ from "lodash"
import * as React from "react"
import { useUpdateEffect } from "react-use"
import { Description } from "@/components/ui/description"
import { Spinner } from "@/components/ui/spinner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { PaginationDataTable } from "./pagination"

export interface DataTableProps<TData> extends Omit<TableOptions<TData>, "getCoreRowModel" | "onPaginationChange"> {
  enablePaginationSelectText?: boolean
  enableScrollFixed?: boolean
  error?: any
  isError?: boolean
  isLoading?: boolean
  onPaginationChange?: (value: PaginationState) => void
  onSorting?: (value: SortingState) => void
  pageIndex?: number
  pageSize?: number
  renderBottom?: React.ReactNode | (({ table }: { table: ReactTable<TData> }) => React.ReactNode) | null
  renderEmpty?: (() => React.ReactNode) | React.ReactNode
  renderError?: ((value: { error: any }) => React.ReactNode) | React.ReactNode
  renderLoading?: (() => React.ReactNode) | React.ReactNode
  renderSubComponent?: (props: { row: RowData }) => React.ReactElement
  renderTop?: React.ReactNode | (({ table }: { table: ReactTable<TData> }) => React.ReactNode)
  size?: number
  sorting?: SortingState
  status?: any
}

export function DataTable<TData>({
  enablePaginationSelectText,
  enableScrollFixed = true,
  error,
  isError,
  isLoading,
  onPaginationChange,
  onSorting,
  pageIndex,
  pageSize,
  renderBottom,
  renderEmpty,
  renderError,
  renderLoading,
  renderSubComponent,
  renderTop,
  size,
  sorting: _sorting,
  status,
  ...others
}: DataTableProps<TData>) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: pageIndex ? pageIndex - 1 : 0,
    pageSize: pageSize || 10,
  })

  useUpdateEffect(() => {
    setPagination({
      pageIndex: pageIndex ? pageIndex - 1 : 0,
      pageSize: pageSize || 10,
    })
  }, [pageIndex, pageSize])

  useUpdateEffect(() => {
    onPaginationChange?.(pagination)
  }, [pagination])

  useUpdateEffect(() => {
    onSorting?.(sorting)
  }, [sorting])

  const pageCount = React.useMemo(
    () => (size && pageSize && pageSize > 0 ? Math.ceil(size / pageSize) : 1),
    [pageSize, size]
  )

  const table = useReactTable({
    ...others,
    state: {
      sorting: _.isNil(_sorting) ? sorting : _sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    defaultColumn: {
      minSize: 0,
      size: Number.MAX_SAFE_INTEGER,
      maxSize: Number.MAX_SAFE_INTEGER,
    },
    pageCount,
    onPaginationChange: setPagination,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div aria-label="table" className="space-y-4">
      {_.isFunction(renderTop) ? renderTop({ table }) : renderTop}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const style = header.column.columnDef.meta?.style || {}
                  const className = header.column.columnDef.meta?.className || ""

                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{
                        width: header.getSize() === Number.MAX_SAFE_INTEGER ? "auto" : header.getSize(),
                        minWidth:
                          header.column.columnDef.minSize === Number.MAX_SAFE_INTEGER
                            ? 0
                            : header.column.columnDef.minSize,
                        maxWidth:
                          header.column.columnDef.maxSize === Number.MAX_SAFE_INTEGER
                            ? "none"
                            : header.column.columnDef.maxSize,
                        ...style,
                      }}
                      className={cn("break-words", className)}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {status === "loading" || isLoading ? (
              <TableRow>
                <TableCell colSpan={others.columns.length} className="h-24 text-center">
                  {_.isFunction(renderLoading)
                    ? renderLoading()
                    : renderLoading || (
                        <div className="grid place-content-center py-5">
                          <Spinner />
                        </div>
                      )}
                </TableCell>
              </TableRow>
            ) : status === "error" || isError ? (
              <TableRow>
                <TableCell colSpan={others.columns.length} className="h-24 text-center">
                  {_.isFunction(renderError)
                    ? renderError({ error })
                    : renderError || <Description description={_.get(error, "message", "No results.")} />}
                </TableCell>
              </TableRow>
            ) : _.isEmpty(table.getRowModel().rows) ? (
              <TableRow>
                <TableCell colSpan={others.columns.length} className="h-24 text-center">
                  {_.isFunction(renderEmpty)
                    ? renderEmpty()
                    : renderEmpty || <Description description={"No results."} />}
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => {
                      const style = cell.column.columnDef.meta?.style || {}
                      const className = cell.column.columnDef.meta?.className || ""

                      return (
                        <TableCell
                          key={cell.id}
                          style={{
                            width: cell.column.getSize() === Number.MAX_SAFE_INTEGER ? "auto" : cell.column.getSize(),
                            minWidth:
                              cell.column.columnDef.minSize === Number.MAX_SAFE_INTEGER
                                ? 0
                                : cell.column.columnDef.minSize,
                            maxWidth:
                              cell.column.columnDef.maxSize === Number.MAX_SAFE_INTEGER
                                ? "none"
                                : cell.column.columnDef.maxSize,
                            ...style,
                          }}
                          className={cn("break-words", className)}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      )
                    })}
                  </TableRow>

                  {row.getIsExpanded() && (
                    <TableRow>
                      <TableCell colSpan={row.getVisibleCells().length}>
                        {_.isFunction(renderSubComponent) ? renderSubComponent({ row }) : null}
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {_.isNull(renderBottom) ? null : _.isFunction(renderBottom) ? (
        renderBottom({ table })
      ) : (
        <PaginationDataTable table={table} enableSelectText={enablePaginationSelectText} />
      )}
    </div>
  )
}

DataTable.messages = "dataTable"
