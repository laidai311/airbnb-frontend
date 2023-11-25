import { Locale, setDefaultOptions } from "date-fns"
import { enUS, vi } from "date-fns/locale"
import { Inter as FontSans } from "next/font/google"
import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { getTranslations, unstable_setRequestLocale } from "next-intl/server"
import FancyboxProvider from "@/components/fancybox-provider"
import { NextAuthProvider } from "@/components/next-auth-provider"
import { NProgressBarProvider } from "@/components/nprogress-bar-provider"
import { PageHeader } from "@/components/page-header"
import { ReactQueryProvider } from "@/components/query-client-provider"
import { NextThemeProvider } from "@/components/theme-provider"
import { ReactHotToastProvider } from "@/components/toast-provider"
import { Toaster } from "@/components/ui/toaster"
import { WindowSizeProvider } from "@/components/window-size.provider"
import { locales } from "@/lib/config"
import { cn } from "@/lib/utils"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

interface Props {
  children: React.ReactNode
  params: { locale: string }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

// export const metadata: Metadata = {
//   title: "Home",
//   description: "Welcome to Next.js",
// }

export async function generateMetadata({ params: { locale } }: Omit<Props, "children">) {
  const t = await getTranslations({ locale, namespace: "LocaleLayout" })

  return {
    title: t("title"),
  }
}

const reLocale = {
  vi: vi,
  en: enUS,
}

export default async function LocaleLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
  params: { locale },
}: Props) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound()

  // Enable static rendering
  unstable_setRequestLocale(locale)

  let messages
  try {
    messages = (await import(`@/messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }

  setDefaultOptions({ locale: reLocale[locale as keyof typeof reLocale] as Locale })

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <NextAuthProvider>
          <ReactQueryProvider>
            <NextThemeProvider>
              <NextIntlClientProvider messages={messages}>
                <main id="app">
                  <FancyboxProvider>
                    <PageHeader className="sticky top-0 z-30" />
                    {children}
                  </FancyboxProvider>
                </main>
                <NProgressBarProvider />
                <Toaster />
                <ReactHotToastProvider />
                <WindowSizeProvider />
              </NextIntlClientProvider>
            </NextThemeProvider>
          </ReactQueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
