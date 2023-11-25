import "@/styles/tailwind.scss"

// import type { Metadata } from "next"

// export const metadata: Metadata = {
//   title: "Home",
//   description: "Welcome to Next.js",
// }

type Props = {
  children: React.ReactNode
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: Props) {
  return children
}
