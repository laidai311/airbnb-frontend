"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import * as React from "react"

export function ReactQueryProvider({ children }: React.PropsWithChildren) {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchOnReconnect: true,
          retry: 1,
          staleTime: 60 * 1000,
        },
      },
    })
  )

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
