import _ from "lodash"
import { CheckIcon, ChevronDownIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button, ButtonProps } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import { useUpdateEffect } from "@/hooks/use-update-effect"
import { cn } from "@/lib/utils"
import { Option } from "@/types"

interface Props {
  buttonProps?: ButtonProps
  count?: number
  enableEdit?: boolean
  enableSearch?: boolean
  enableToggle?: boolean
  loading?: boolean
  onValueChange?: (value: any) => void
  options?: Option[]
  renderEmpty?: (() => React.ReactNode) | React.ReactNode
  renderOption?: ((value: { option: any }) => React.ReactNode) | React.ReactNode
  searchProps?: { defaultValue?: string; value?: string; onValueChange?: (value: string) => void }
  title?: string
  type?: "multiple" | "single"
  value: any
}

export function OptionsEditable({
  buttonProps,
  count = 2,
  enableEdit = true,
  enableSearch = false,
  enableToggle,
  loading,
  onValueChange,
  options,
  renderEmpty,
  renderOption,
  searchProps = {},
  title,
  type = "single",
  value: _value,
}: Props) {
  const [value, setValue] = React.useState<any>(_.isNil(_value) ? (type === "multiple" ? [] : undefined) : _value)
  const t = useTranslations("common")

  useUpdateEffect(() => {
    setValue(_value)
  }, [_value])

  const found = type === "multiple" ? undefined : _.find(options, { value })

  if (!enableEdit) return found?.label || "-"

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          {...buttonProps}
          disabled={loading}
          variant="outline"
          className={cn("border-dashed [&[data-state=open]>svg]:rotate-180", buttonProps?.className)}
        >
          {type === "multiple" ? (
            _.size(value) > 0 && (
              <div className="flex space-x-1">
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
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            )
          ) : (
            <Badge variant="secondary" className="rounded-sm px-1 font-normal">
              {found?.label || "-"}
            </Badge>
          )}
          <Separator orientation="vertical" className="mx-2 h-5" />
          {loading ? (
            <Spinner className="m-0" />
          ) : (
            <ChevronDownIcon className="h-4 w-4 transition-transform duration-200" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          {enableSearch && <CommandInput placeholder={title} {...searchProps} />}

          <CommandList>
            <CommandEmpty>
              {_.isFunction(renderEmpty) ? renderEmpty() : renderEmpty || t("no_results_found")}
            </CommandEmpty>
            <CommandGroup>
              {_.isArray(options) &&
                _.size(options) > 0 &&
                options.map((option, key) => {
                  const isSelected =
                    type === "multiple" && Array.isArray(value) ? value.includes(option.value) : value == option.value
                  if (option?.hidden) return null

                  return (
                    <CommandItem
                      disabled={option?.disabled}
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
                        <CheckIcon className={"h-4 w-4"} />
                      </div>
                      {_.isFunction(renderOption) ? renderOption({ option }) : <span>{option.label}</span>}
                    </CommandItem>
                  )
                })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
