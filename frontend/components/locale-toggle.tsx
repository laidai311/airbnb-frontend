"use client"

import Link from "next/link"
import { useRouter } from "next/router"
import { useTranslations } from "next-intl"
import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"

export function LocaleToggle() {
  const t = useTranslations("Page")

  const { locale, locales, route, asPath, ...router } = useRouter()
  const hasQuery = Boolean(Object.keys(router.query).length > 0)

  const getLanguagesName = (value: string) => {
    switch (value) {
      case "vi":
        return t("vi")
      case "en":
        return t("en")
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="uppercase">
          {locale}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{t("Languages")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={locale}>
          {locales?.map((locale) =>
            React.cloneElement(
              // eslint-disable-next-line jsx-a11y/anchor-has-content
              hasQuery ? <a href={`/${locale}/${asPath}`}></a> : <Link href={route} locale={locale} />,
              { key: locale },
              <DropdownMenuRadioItem value={locale}>{getLanguagesName(locale)}</DropdownMenuRadioItem>
            )
          )}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
