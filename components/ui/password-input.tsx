import { EyeIcon, EyeOffIcon } from "lucide-react"
import * as React from "react"
import { createContext } from "@/hooks/use-context"
import { useControllableState } from "@/hooks/use-controllable-state"
import { Button } from "./button"
import { Input, InputProps } from "./input"

export type ReactRef<T> = React.RefObject<T> | React.MutableRefObject<T> | React.Ref<T> | React.RefCallback<T>

interface UsePasswordGroupProps {
  initialValue?: boolean
  control?: ReactRef<any> | any
}

function usePasswordGroup({ initialValue = false, control }: UsePasswordGroupProps = {}) {
  const [isText, setIsText] = React.useState(initialValue)

  if (typeof control === "function") {
    control({ isText, setIsText })
  } else if (typeof control === "object" && "current" in control && control !== null && control !== undefined) {
    control.current = { isText, setIsText }
  }

  return { isText, setIsText } as const
}

type UsePasswordGroupReturn = ReturnType<typeof usePasswordGroup>

const [PasswordGroupProvider, usePasswordGroupContext] = createContext<UsePasswordGroupReturn>({
  name: "PasswordGroupContext",
  errorMessage:
    "PasswordGroup: `context` is undefined. Seems you forgot to wrap all popover components within `<AnimateList />`",
  strict: false,
})

interface PasswordGroupProps extends UsePasswordGroupProps {
  children: React.ReactNode | ((value: UsePasswordGroupReturn) => React.ReactNode)
}

export const PasswordInputGroup = ({ children, ...otherProps }: PasswordGroupProps) => {
  const context = usePasswordGroup(otherProps)

  return (
    <PasswordGroupProvider value={context}>
      {typeof children === "function" ? children(context) : children}
    </PasswordGroupProvider>
  )
}

export const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const context = usePasswordGroupContext()

  const [isText, setIsText] = useControllableState<boolean>({
    prop: context?.isText,
    defaultProp: context?.isText,
    onChange: context?.setIsText,
  })

  return (
    <div className="relative">
      <Input ref={ref} {...props} type={isText ? "text" : "password"} />

      <div className="absolute inset-y-0 right-0 flex items-center">
        <Button
          tabIndex={-1}
          onClick={() => setIsText(!isText)}
          variant={"ghost"}
          size={"icon"}
          type="button"
          className="opacity-70 hover:bg-transparent"
        >
          {isText ? <EyeIcon className="h-4 w-4" /> : <EyeOffIcon className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
})

PasswordInput.displayName = "PasswordInput"
