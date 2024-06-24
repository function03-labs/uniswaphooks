import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"

import { SelectableComponentProps } from "@/components/emoji-picker/SelectableComponentProps"

declare module "styled-components" {
  export interface DefaultTheme {
    name: string
  }
}

export function EmojiPicker({ onSelect }: SelectableComponentProps<string>) {
  return (
    <Picker
      autoFocus
      data={data}
      theme="light"
      showPreview={false}
      showSkinTones={false}
      onEmojiSelect={(emoji: any) => {
        if (!emoji?.native) return

        onSelect(emoji.native)
      }}
    />
  )
}
