import Container from "@component/overall/Container";
import HeroBanner from "@component/section/HeroBanner";
import NewHookForm from "@component/form/NewHook";

export const metadata = {
  title: "Submit your hook",
  description:
    "Submit your Hook, and we'll review it for inclusion in the marketplace.",
};

export default function SubmitHookPage() {
  return (
      <Container classNames="max-w-md lg:px-48 pb-8 lg:pb-12">
        <HeroBanner
          title="Add a new hook"
          subtitle="Please ensure your hook adheres to the standards and guidelines of the UniswapHooks community."
        />
        <NewHookForm />
      </Container>
  );
}
