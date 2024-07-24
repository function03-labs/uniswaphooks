import { notFound } from "next/navigation"

import { DeployHook } from "@/components/form/DeployHook"
import { NewHookForm } from "@/components/form/NewHook"
import { UploadHook } from "@/components/form/UploadHook"
import { Container } from "@/components/overall/Container"
import { HeroBanner } from "@/components/section/HeroBanner"
import { HookSubbmission } from "@/components/showcase/HookSubbmission"
import { Panels } from "@/components/showcase/Panels"

export const metadata = {
  title: "Submit your hook",
  description:
    "Submit your Hook, and we'll review it for inclusion in the marketplace.",
}

async function fetchCategories() {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/category`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const response = await data.json()

    return response.data
  } catch (error) {
    console.error("Category fetch error:", error)
  }
}

export default async function SubmitHookPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  var step
  var heading = "Add a new hook"
  var text =
    "Please ensure your hook adheres to the standards and guidelines of the UniswapHooks community."

  const categories = await fetchCategories()

  if (searchParams.step === "details") {
    step = 1
  } else if (searchParams.step === "upload") {
    step = 2
  } else if (searchParams.step === "deployment" && searchParams.id) {
    step = 3
  } else if (searchParams.step === "submission" && searchParams.id) {
    step = 4
    ;(heading = "🎉Congrats on subbmitting your hook"),
      (text =
        "Your hook is now under review and will be added to the marketplace soon.")
  } else {
    step = 1
  }

  const renderStepContent = () => {
    switch (searchParams.step) {
      case "details":
        return <NewHookForm categories={categories} />
      case "upload":
        return <UploadHook id={String(searchParams.id)} />
      case "deployment":
        return <DeployHook id={String(searchParams.id)} />
      case "submission":
        return (
          <HookSubbmission
            id={String(searchParams.id)}
            categories={categories}
          />
        )
      case undefined:
        return <NewHookForm categories={categories} />
      default:
        return notFound()
    }
  }

  return (
    <Container classNames="max-w-md lg:px-48 pb-8 lg:pb-12">
      <Panels currentStep={step} />
      <HeroBanner title={heading} subtitle={text} />
      {renderStepContent()}
    </Container>
  )
}
