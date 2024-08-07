import { Container } from "@/components/overall/Container"

export function HeroBanner({
  children,
  subtitle,
  title,
}: {
  children?: React.ReactNode
  subtitle: string
  title: string
}) {
  return (
    <section className="bg-white text-center">
      <Container classNames="py-8 lg:py-12">
        <div className="flex flex-col space-y-4 space-y-reverse">
          <h1 className="order-last text-lg text-gray-700">{subtitle}</h1>

          <h2 className="text-5xl font-bold text-gray-900 sm:text-6xl">
            {title}
          </h2>
        </div>

        <div className="mx-auto mt-6 max-w-lg text-base/relaxed text-gray-600">
          {children}
        </div>
      </Container>
    </section>
  )
}
