import SyntaxHighlighter from "react-syntax-highlighter";
import { monoBlue } from "react-syntax-highlighter/dist/esm/styles/hljs";

export function SyntaxHighler({ code }: { code: string }) {
  return (
    <SyntaxHighlighter
      showLineNumbers={true}
      showInlineLineNumbers={true}
      lineNumberContainerStyle={{ width: "2em" }}
      language="javascript"
      style={monoBlue}
    >
      {code}
    </SyntaxHighlighter>
  );
}
