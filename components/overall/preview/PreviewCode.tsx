import Prism from "prismjs";
import { useEffect, useState } from "react";
import { PreviewCodeProps } from "@/types/preview";

require("prismjs/components/prism-jsx.min");

export default function PreviewCode({
  showPreview,
  componentCode = "",
  handleSetType,
  showToggle = false,
  codeType = "html",
}: PreviewCodeProps) {
  const [prismClass, setPrismClass] = useState("language-html");

  useEffect(() => Prism.highlightAll(), [componentCode]);

  useEffect(() => {
    codeType === "html" && setPrismClass("language-html");
    codeType === "vue" && setPrismClass("language-html");
    codeType === "jsx" && setPrismClass("language-jsx");
  }, [codeType]);

  return <></>;
}
