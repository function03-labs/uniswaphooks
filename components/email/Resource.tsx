import * as React from "react"
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components"

import { ResouceEmailType } from "@/types/post"

const main = {
  backgroundColor: "#ffffff",
  color: "#24292e",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
}

const container = {
  maxWidth: "480px",
  margin: "0 auto",
  padding: "20px 0 48px",
}

const section = {
  padding: "24px",
  border: "solid 1px #dedede",
  borderRadius: "5px",
  textAlign: "center" as const,
}

const text = {
  margin: "0 0 10px 0",
  textAlign: "left" as const,
}

const button = {
  fontSize: "14px",
  backgroundColor: "#28a745",
  color: "#fff",
  lineHeight: 1.5,
  borderRadius: "0.5em",
  padding: "12px 24px",
}

const link = {
  color: "#0366d6",
  fontSize: "12px",
}

const footer = {
  color: "#6a737d",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "60px",
}

export function Resource({ resource }: { resource: ResouceEmailType }) {
  console.log(resource)
  return (
    <Html>
      <Head />
      <Preview>New resource have been submitted by @{resource.user}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://uniswaphooks.com/_next/image?url=%2Funiswap-hooks-logo.png&w=64&q=100"
            width="32"
            height="32"
            alt="UniswapHooks"
          />

          <Text style={text}>
            A new resource submit by <strong>@{resource.user}</strong>,
          </Text>

          <Section style={section}>
            <Text style={text}>
              Hey <strong>admins</strong>! You can open the resource by clicking{" "}
              <Link
                href={resource.resourceUrl}
                style={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </Link>
              .
            </Text>
            <Text style={text}>
              <strong>
                {resource.emoji}
                {resource.title}
              </strong>
            </Text>
            <Text style={text}>{resource.description}</Text>
            <Text style={text}>
              Status: <strong>Under review</strong>
            </Text>
            <Button
              style={button}
              href={`${process.env.NEXT_PUBLIC_URL}/dashboard/resource/review/${resource.id}`}
            >
              Review the resource
            </Button>{" "}
          </Section>
          <Text style={footer}>UniswapHooks, Inc.</Text>
        </Container>
      </Body>
    </Html>
  )
}
