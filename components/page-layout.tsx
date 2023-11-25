type Props = {
  children?: React.ReactNode
  title: React.ReactNode
}

export default function PageLayout({ children, title }: Props) {
  return <div>{children}</div>
}
