"use client"

import { useEffect, useRef, useState } from "react"
import { blogPreviewHtml } from "@lib/transformers"
import { useInView } from "react-intersection-observer"
import { BlogPreview as BlogPreviewType } from "@/types/post"

import { PreviewCode } from "@/components/overall/preview/PreviewCode"
import { PreviewCopy } from "@/components/overall/preview/PreviewCopy"
import { PreviewIframe } from "@/components/overall/preview/PreviewIframe"
import { PreviewView } from "@/components/overall/preview/PreviewView"

export function BlogPreview({
  previewId,
  previewTitle,
  previewContainer,
}: BlogPreviewType) {
  const refIframe = useRef(null)

  const [previewCode, setPreviewCode] = useState("")
  const [previewHtml, setPreviewHtml] = useState("")
  const [showPreview, setShowPreview] = useState(true)
  const [isDarkMode] = useState(false)

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      fetchHtml()
    }
  }, [fetchHtml, inView])

  useEffect(() => {
    if (inView) {
      fetchHtml()
    }
  }, [fetchHtml, inView, isDarkMode])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetchHtml() {
    const previewUrl = `/blogs/${previewId}.html`

    const fetchResponse = await fetch(previewUrl)
    const textResponse = await fetchResponse.text()
    const transformedHtml = blogPreviewHtml(
      textResponse,
      previewContainer,
      isDarkMode
    )

    setPreviewCode(textResponse)
    setPreviewHtml(transformedHtml)
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
  )
}
