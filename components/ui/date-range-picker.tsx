import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { useTranslations } from "next-intl"
import * as React from "react"
import { DateRange } from "react-day-picker"

import { useUpdateEffect } from "react-use"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

type Props = React.HTMLAttributes<HTMLDivElement> & {
  value?: DateRange
  onValueChange?: (value?: DateRange) => void
  title?: string
}

export function CalendarDateRangePicker({ title, className, value: _value, onValueChange: _onValueChange }: Props) {
  const t = useTranslations("Page")
  const [value, setValue] = React.useState<DateRange>({
    from: _value?.from || undefined,
    to: _value?.to || undefined,
  })

  useUpdateEffect(() => {
    setValue({
      from: _value?.from || undefined,
      to: _value?.to || undefined,
    })
  }, [_value])

  const onValueChange = React.useCallback(
    (val?: DateRange) => {
      const result = {
        from: val?.from || undefined,
        to: val?.to || undefined,
      }
      setValue(result)
      _onValueChange?.(result)
    },
    [_onValueChange]
  )

  return (
    <div className={"grid gap-2"}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("w-80 justify-start text-left font-normal", !value && "text-muted-foreground", className)}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, "LLL dd, y")} - {format(value.to, "LLL dd, y")}
                </>
              ) : (
                format(value.from, "LLL dd, y")
              )
            ) : (
              <span className="font-semibold">{title}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            onSelect={onValueChange}
            numberOfMonths={2}
          />
          {(value?.from || value?.to) && (
            <div className="p-3">
              <Button
                variant={"ghost"}
                onClick={() => {
                  onValueChange()
                }}
                className="w-full"
              >
                {t("Clear")}
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}
