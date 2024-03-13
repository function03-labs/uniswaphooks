import { notFound } from "next/navigation";

import Panels from "@component/showcase/Panels";
import Container from "@component/overall/Container";
import HeroBanner from "@component/section/HeroBanner";

import NewHookForm from "@component/form/NewHook";
import UploadHook from "@/components/form/UploadHook";
import DeployHookForm from "@component/form/DeployHook";
import HookSubbmission from "@component/showcase/HookSubbmission";

export const metadata = {
  title: "Submit your hook",
  description:
    "Submit your Hook, and we'll review it for inclusion in the marketplace.",
};

export default function SubmitHookPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  var step;
  var heading = "Add a new hook";
  var text =
    "Please ensure your hook adheres to the standards and guidelines of the UniswapHooks community.";

  if (searchParams.step === "details") {
    step = 1;
/*   } else if (searchParams.step === "upload") {
    step = 2; */
  } else if (searchParams.step === "deployment" && searchParams.id) {
    step = 3;
  } else if (searchParams.step === "submission" && searchParams.id) {
    step = 4;
    (heading = "🎉Congrats on subbmitting your hook"),
      (text =
        "Your hook is now under review and will be added to the marketplace soon.");
  } else {
    step = 1;
  }

  const renderStepContent = () => {
    switch (searchParams.step) {
      case "details":
        return <NewHookForm />;
/*       case "upload":
        return <UploadHook id={String(searchParams.id)} />; */
      case "deployment":
        return <DeployHookForm id={String(searchParams.id)} />;
      case "submission":
        return <HookSubbmission id={String(searchParams.id)} />;
      case undefined:
        return <NewHookForm />;
      default:
        return notFound();
    }
  };

  return (
    <Container classNames="max-w-md lg:px-48 pb-8 lg:pb-12">
      <Panels currentStep={step} />
      <HeroBanner title={heading} subtitle={text} />
      {renderStepContent()}
    </Container>
  );
}
