"use client"

import Link from "next/link"
import ShowMoreText from "react-show-more-text"
import { ResourcePost } from "@/types/post"

import { Badge } from "@/components/ui/Badge"

export default function ResourceCard({
  resourcePost,
}: {
  resourcePost: ResourcePost
}) {
  return (
    <Link target="_blank" href={resourcePost.resourceUrl}>
      <section
        id={resourcePost.id}
        className="group relative block h-full bg-white before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-dashed before:border-gray-900"
      >
        <div className="h-full rounded-lg border-2 border-gray-900 bg-white transition group-hover:-translate-x-2 group-hover:-translate-y-2">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="mt-16 sm:mt-20 lg:mt-24">
              <span
                aria-hidden="true"
                role="img"
                className="first-letter-only text-3xl sm:text-4xl"
              >
                {resourcePost.emoji}
              </span>

              <h2 className="mt-4 text-lg font-medium text-gray-900 sm:text-xl">
                {resourcePost.title}
              </h2>

              <ShowMoreText
                lines={3}
                more="Show more"
                less="Show less"
                className="content-css"
                anchorClass="show-more-less-clickable"
                expanded={false}
                truncatedEndingComponent={"... "}
              >
                {resourcePost.description}
              </ShowMoreText>

              <Badge className="mt-4"># {resourcePost.section}</Badge>
            </div>
          </div>
        </div>
      </section>
    </Link>
  )
}
