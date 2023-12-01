import { createContext } from "@/hooks/use-context"

import { UseAnimateListReturn } from "./use-animate-list"

export const [AnimateListProvider, useAnimateListContext] = createContext<UseAnimateListReturn>({
  name: "AnimateListContext",
  errorMessage:
    "useModalContext: `context` is undefined. Seems you forgot to wrap all popover components within `<AnimateList />`",
})
