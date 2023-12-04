import { CheckIcon } from "@radix-ui/react-icons"
import _ from "lodash"
import { ListFilterIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import * as React from "react"

import { useUpdateEffect } from "react-use"
import { Badge } from "@/components/ui/badge"
import { Button, ButtonProps } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"
import { Option } from "@/types"

export interface OptionsFilterProps {
  buttonProps?: ButtonProps
  count?: number
  enableSearch?: boolean
  enableToggle?: boolean
  loading?: boolean
  onOpenChange?: (open: boolean) => void
  onValueChange?: (value?: string) => void
  options?: Option[]
  renderBottom?: (() => React.ReactNode) | React.ReactNode
  renderEmpty?: (() => React.ReactNode) | React.ReactNode
  renderTop?: (() => React.ReactNode) | React.ReactNode
  renderOption?: ((value: { option: any }) => React.ReactNode) | React.ReactNode
  searchProps?: { defaultValue?: string; value?: string; onValueChange?: (value: string) => void }
  title?: string
  type?: "multiple" | "single"
  value: any
}

export function OptionsFilter({
  buttonProps,
  count = 2,
  enableSearch = false,
  enableToggle,
  loading,
  onOpenChange,
  onValueChange,
  options,
  renderBottom,
  renderEmpty,
  renderTop,
  renderOption,
  searchProps = {},
  title,
  type = "single",
  value: _value,
}: OptionsFilterProps) {
  const [value, setValue] = React.useState<any>(_.isNil(_value) ? (type === "multiple" ? [] : undefined) : _value)
  const t = useTranslations("Page")

  useUpdateEffect(() => {
    setValue(_value)
  }, [_value])

  const found = type === "multiple" ? undefined : _.find(options, { value })

  return (
    <Popover onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          {...buttonProps}
          disabled={loading}
          variant="outline"
          size="sm"
          className={cn("border-dashed", buttonProps?.className)}
        >
          {loading ? <Spinner className="m-0" /> : <ListFilterIcon className="mr-2 h-4 w-4" />}
          {title}
          {type === "multiple"
            ? _.size(value) > 0 && (
                <>
                  <Separator orientation="vertical" className="mx-2 h-4" />
                  <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                    {_.size(value)}
                  </Badge>
                  <div className="hidden space-x-1 lg:flex">
                    {_.size(value) > count ? (
                      <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                        {_.size(value)} selected
                      </Badge>
                    ) : (
                      _.isArray(options) &&
                      _.size(options) > 0 &&
                      options
                        .filter((option) => _.includes(value, option.value))
                        .map((option) => (
                          <Badge variant="secondary" key={option.value} className="rounded-sm px-1 font-normal">
                            {option.label || "-"}
                          </Badge>
                        ))
                    )}
                  </div>
                </>
              )
            : found && (
                <>
                  <Separator orientation="vertical" className="mx-2 h-4" />
                  <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                    {1}
                  </Badge>
                  <div className="hidden space-x-1 lg:flex">
                    <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                      {found.label || "-"}
                    </Badge>
                  </div>
                </>
              )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          {enableSearch && <CommandInput placeholder={title} {...searchProps} />}

          {_.isFunction(renderTop) ? renderTop() : renderTop}

          <CommandList>
            <CommandEmpty>{_.isFunction(renderEmpty) ? renderEmpty() : renderEmpty || t("No result")}</CommandEmpty>
            <CommandGroup>
              {_.isArray(options) &&
                _.size(options) > 0 &&
                options.map((option, key) => {
                  const isSelected =
                    type === "multiple" && Array.isArray(value) ? value.includes(option.value) : value === option.value

                  return (
                    <CommandItem
                      key={key}
                      className={cn(type !== "multiple" ? "[&>div]:rounded-full" : "[&>div]:rounded-[5px]")}
                      onSelect={() => {
                        if (type === "multiple") {
                          let result = []
                          if (isSelected) {
                            result = value.filter((item: any) => item !== option.value)
                          } else {
                            result = [...value, option.value]
                          }

                          setValue(result)
                          if (!_.isEqual(result, _value)) {
                            onValueChange?.(result)
                          }
                        } else {
                          const result = enableToggle && isSelected ? undefined : option.value

                          setValue(result)

                          if (!_.isEqual(result, _value)) {
                            onValueChange?.(result)
                          }
                        }
                      }}
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <CheckIcon className={cn("h-4 w-4")} />
                      </div>

                      {_.isFunction(renderOption) ? renderOption({ option }) : <span>{option.label}</span>}
                    </CommandItem>
                  )
                })}
            </CommandGroup>
            {found && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      onValueChange?.(undefined)
                    }}
                    className="justify-center text-center"
                  >
                    {t("Clear")}
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>

          {_.isFunction(renderBottom) ? renderBottom() : renderBottom}
        </Command>
      </PopoverContent>
    </Popover>
  )
}
