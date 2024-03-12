"use client";

import { useRef, useState } from "react";

import { useInView } from "react-intersection-observer";

import PreviewCreator from "@component/overall/preview/PreviewCreator";
import PreviewCopy, {
  PreviewGithub,
  PreviewWebsite,
} from "@component/overall/preview/PreviewCopy";
import PreviewIframe from "@component/overall/preview/PreviewIframe";
import PreviewTitle from "@component/overall/preview/PreviewTitle";
import { HookType } from "@/types/hook";

export default function ComponentPreview({
  componentData,
}: {
  componentData: HookType;
}) {
  const refIframe = useRef(null);

  const [previewWidth, setPreviewWidth] = useState("100%");
  const [showPreview, setShowPreview] = useState(true);

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const {
    id: componentId,
    title: componentTitle,
    description: componentDescription,
    github: componentGithub,
    creator: componentCreator,
  } = componentData;

  return (
    <div ref={ref} id={componentId.toString()} className="max-w-md p-2">
      <div className="space-y-2">
        <PreviewTitle
          componentTitle={componentTitle}
          componentId={componentId.toString()}
        />

        <div className="lg:flex lg:items-end">
          <div className="flex flex-wrap items-end gap-2">
            <PreviewCopy
              componentCode={componentTitle + "\n" + componentDescription}
            />

            <PreviewGithub repoUrl={componentGithub} />
            <PreviewWebsite
              websiteUrl={`${process.env.NEXT_PUBLIC_URL}/hooks/hook/${componentId}`}
            />
          </div>
        </div>

        <div className="relative">
          <div>
            <PreviewIframe
              showPreview={showPreview}
              componentId={componentId.toString()}
              componentTitle={componentTitle}
              componentDescription={componentDescription}
              componentCreator={componentCreator}
              previewWidth={previewWidth}
              refIframe={refIframe}
              componentHtml={""}
              previewDark={false}
            />
          </div>
        </div>

        {componentCreator && (
          <PreviewCreator
            creatorGithub={componentCreator}
          />
        )}
      </div>
    </div>
  );
}
