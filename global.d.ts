// Use type safe message keys with `next-intl`
type Messages = typeof import("./messages/vi.json")
declare interface IntlMessages extends Messages {}
