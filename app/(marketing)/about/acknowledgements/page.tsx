import Container from "@component/overall/Container";

export const metadata = {
  title: "Acknowledgements",
  description: "Acknowledgements for UniswapHooks",
};

export default async function Page() {
  return (
    <Container classNames="py-8 lg:py-12">
      <article className="prose mx-auto">
        <h1>Project Acknowledgements</h1>

        <p className="text-gray-600">
          These are not all of the tools/libraries used to make UniswapHooks,
          but these are the ones that I think deserve a mention as they could
          easily fly under the radar, but in fact are very important to the
          project.
        </p>

        <ul>
          <li>
            <a href="https://uniswapfoundation.org" target="_blank">
              Uniswap Foundation
            </a>
          </li>
          <li>
            <a href="awesome-uniswap-hooks" target="_blank">
              Awesome Uniswap Hooks
            </a>
          </li>
          <li>
            <a
              href="https://github.com/thanpolas/univ3prices/tree/main"
              target="_blank"
            >
              univ3prices
            </a>
          </li>
        </ul>
      </article>
    </Container>
  );
}
