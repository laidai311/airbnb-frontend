import { getRequestConfig } from "next-intl/server"

export default getRequestConfig(async ({ locale }) => ({
  messages: (
    await (locale === "vi"
      ? // When using Turbopack, this will enable HMR for `en`
        import("@/messages/vi.json")
      : import(`@/messages/${locale}.json`))
  ).default,
}))
