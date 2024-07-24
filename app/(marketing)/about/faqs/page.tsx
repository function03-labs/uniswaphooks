import { Container } from "@/components/overall/Container"
import { FaqList } from "@/components/section/FaqList"

export const metadata = {
  title: "FAQs",
  description: "Find out more about UniswapHooks with these handy FAQs.",
}

export default async function Page() {
  return (
    <Container classNames="py-8 lg:py-12">
      <article className="prose mx-auto">
        <h1>FAQs</h1>

        <p className="text-gray-600">
          Find out more about UniswapHooks with these handy FAQs.
        </p>

        <FaqList />
      </article>
    </Container>
  )
}
