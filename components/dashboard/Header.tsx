interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
}

export function DashboardHeader({
  heading,
  text,
  children,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col items-center justify-between px-2 md:flex-row">
      <div className="mb-4 grid gap-1 md:mb-0">
        <h1 className="text-3xl font-bold md:text-4xl">{heading}</h1>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
      <div>{children}</div>
    </div>
  )
}
