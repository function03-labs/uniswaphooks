"use client";

import { useEffect, useRef, useState } from "react";

import { useInView } from "react-intersection-observer";

import { BlogPreview } from "@/types/post";
import { blogPreviewHtml } from "@lib/transformers";

import PreviewView from "@component/overall/preview/PreviewView";
import PreviewCode from "@component/overall/preview/PreviewCode";
import PreviewCopy from "@component/overall/preview/PreviewCopy";
import PreviewIframe from "@component/overall/preview/PreviewIframe";

export default function BlogPreview({
  previewId,
  previewTitle,
  previewContainer,
}: BlogPreview) {
  const refIframe = useRef(null);

  const [previewCode, setPreviewCode] = useState("");
  const [previewHtml, setPreviewHtml] = useState("");
  const [showPreview, setShowPreview] = useState(true);
  const [isDarkMode] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      fetchHtml();
    }
  }, [fetchHtml, inView]);

  useEffect(() => {
    if (inView) {
      fetchHtml();
    }
  }, [fetchHtml, inView, isDarkMode]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetchHtml() {
    const previewUrl = `/blogs/${previewId}.html`;

    const fetchResponse = await fetch(previewUrl);
    const textResponse = await fetchResponse.text();
    const transformedHtml = blogPreviewHtml(
      textResponse,
      previewContainer,
      isDarkMode
    );

    setPreviewCode(textResponse);
    setPreviewHtml(transformedHtml);
  }

  return (
    <div className="not-prose space-y-4 lg:-ms-[10ch] lg:w-[85ch]" ref={ref}>
      {previewCode && (
        <div className="flex gap-4">
          <PreviewView
            handleSetShowPreview={setShowPreview}
            showPreview={showPreview}
          />

          <PreviewCopy componentCode={previewCode} />
        </div>
      )}

      <div className="relative">
        <div>
          <PreviewIframe
            showPreview={showPreview}
            componentHtml={previewHtml}
            componentTitle={previewTitle}
            refIframe={refIframe}
            previewDark={isDarkMode}
            componentCreator={""}
            componentDescription={""}
            previewWidth={""}
          />

          <PreviewCode
            showPreview={showPreview}
            componentCode={previewCode}
            handleSetType={undefined}
            codeType={""}
          />
        </div>
      </div>
    </div>
  );
}
