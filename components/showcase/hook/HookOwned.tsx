"use client";

import { useRef, useState } from "react";

import { useInView } from "react-intersection-observer";

import {
  PreviewFolder,
  PreviewConfig,
} from "@component/overall/preview/PreviewCopy";
import { PreviewStatus } from "@component/overall/preview/PreviewStatus";
import PreviewIframe from "@component/overall/preview/PreviewIframe";
import PreviewTitle from "@component/overall/preview/PreviewTitle";
import { Skeleton } from "@component/ui/Skeleton";
import { HookType } from "@/types/hook";

export default function HookOwned({
  componentData,
  role,
}: {
  componentData: HookType;
  role: string;
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
    creatorName: componentCreator,
  } = componentData;

  return (
    <div ref={ref} id={componentId} className="p-2">
      <div className="space-y-2">
        <PreviewTitle
          componentTitle={componentTitle}
          componentId={componentId}
        />

        <div className="flex tems-start justify-between gap-2 w-full">
          <div className="flex flex-wrap items-end gap-2">
            <PreviewConfig type="hook" componentData={componentData} />
            <PreviewFolder url={`/hooks/hook/${componentId}`} />
          </div>
          <div className="flex justify-end">
            <PreviewStatus componentData={componentData} role={role} />
          </div>
        </div>

        <div className="relative">
          <div>
            <PreviewIframe
              showPreview={showPreview}
              componentId={componentId}
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
      </div>
    </div>
  );
}

HookOwned.Skeleton = function HookOwnedSkeleton() {
  return (
    <div className="max-w-md p-2">
      <div className="space-y-2">
        <Skeleton />
        <div className="lg:flex lg:items-start lg:justify-between gap-2 w-full">
          <div className="flex flex-wrap items-end gap-2">
            <Skeleton />
            <Skeleton />
          </div>
          <div className="flex justify-end">
            <Skeleton />
          </div>
        </div>
        <div className="relative">
          <div>
            <Skeleton />
          </div>
        </div>
      </div>
    </div>
  );
};
