"use client"

import { useRef, useState } from "react"
import { useInView } from "react-intersection-observer"

import { CategoryType, HookType } from "@/types/hook"

import { Skeleton } from "@/components/ui/Skeleton"
import {
  PreviewConfig,
  PreviewFolder,
} from "@/components/overall/preview/PreviewCopy"
import { PreviewIframe } from "@/components/overall/preview/PreviewIframe"
import { PreviewStatus } from "@/components/overall/preview/PreviewStatus"
import { PreviewTitle } from "@/components/overall/preview/PreviewTitle"

export function HookOwned({
  componentData,
  role,
  categories,
}: {
  componentData: HookType
  role: string
  categories: CategoryType[]
}) {
  const refIframe = useRef(null)

  const [previewWidth, setPreviewWidth] = useState("100%")
  const [showPreview, setShowPreview] = useState(true)

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  })

  const {
    id: componentId,
    title: componentTitle,
    description: componentDescription,
    creatorName: componentCreator,
  } = componentData

  return (
    <div ref={ref} id={componentId} className="p-2">
      <div className="space-y-2">
        <PreviewTitle
          componentTitle={componentTitle}
          componentId={componentId}
        />

        <div className="tems-start flex w-full justify-between gap-2">
          <div className="flex flex-wrap items-end gap-2">
            <PreviewConfig
              type="hook"
              componentData={componentData}
              categories={categories}
            />
            <PreviewFolder url={`/hooks/hook/${componentId}`} />
          </div>
          <div className="flex justify-end">
            <PreviewStatus
              id={componentData.id}
              status={componentData.status}
              role={role}
              variant="hook"
            />
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
  )
}

HookOwned.Skeleton = function HookOwnedSkeleton() {
  return (
    <div className="max-w-md p-2">
      <div className="space-y-2">
        <Skeleton />
        <div className="w-full gap-2 lg:flex lg:items-start lg:justify-between">
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
  )
}
