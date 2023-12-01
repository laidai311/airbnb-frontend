import { SearchIcon } from "lucide-react"
import * as React from "react"
import { useUpdateEffect } from "react-use"
import { Button, ButtonProps } from "@/components/ui/button"
import { Input, InputProps } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Spinner } from "./spinner"

interface Props {
  value?: string
  onSearch?: (value?: string) => void
  inputProps?: InputProps
  buttonProps?: ButtonProps
  loading?: boolean
  className?: string
}

export function SearchInput({ value: _value, onSearch, inputProps, buttonProps, loading, className }: Props) {
  const [value, setValue] = React.useState(_value)

  useUpdateEffect(() => {
    setValue(_value)
  }, [_value])

  const handlerSearch = () => {
    onSearch?.(value)
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Input
        {...inputProps}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault()
            handlerSearch()
          }
        }}
      />
      <Button
        {...buttonProps}
        onClick={handlerSearch}
        type="button"
        size={"icon"}
        variant={"secondary"}
        className={cn("shrink-0", buttonProps?.className)}
      >
        {loading ? <Spinner /> : <SearchIcon className="h-4 w-4" />}
      </Button>
    </div>
  )
}
