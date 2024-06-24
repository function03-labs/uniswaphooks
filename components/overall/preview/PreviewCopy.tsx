import { useState } from "react"
import Link from "next/link"
import { useCopyToClipboard } from "react-use"
import { CategoryType, HookType } from "@/types/hook"
import { ResourcePost } from "@/types/post"

import { AlertDialog, AlertDialogTrigger } from "@/components/ui/AlertDialog"
import { ButtonStyle } from "@/components/ui/ButtonStyle"
import { Dialog, DialogTrigger } from "@/components/ui/Dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { DeleteHook } from "@/components/form/DeleteHook"
import { DeleteResource } from "@/components/form/DeleteResource"
import { EditHook } from "@/components/form/EditHook"
import { EditResource } from "@/components/form/EditResource"

export function PreviewCopy({ componentCode = "" }) {
  const [buttonText, setButtonText] = useState("Copy")
  const [buttonEmoji, setButtonEmoji] = useState("📋")
  const [copyStatus, copyToClipboard] = useCopyToClipboard()

  const buttonActive = buttonText === "Copied"

  function handleCopyToClipboard() {
    copyToClipboard(componentCode)

    if (copyStatus.error) {
      setButtonText("Error")
      setButtonEmoji("🚨")

      return
    }

    setButtonText("Copied")
    setButtonEmoji("🎉")

    setTimeout(() => {
      setButtonText("Copy")
      setButtonEmoji("📋")
    }, 3000)
  }

  return (
    <button className="block" onClick={handleCopyToClipboard}>
      <ButtonStyle
        buttonEmoji={buttonEmoji}
        buttonText={buttonText}
        buttonActive={buttonActive}
        isDark={false}
        classAdd={""}
      />
    </button>
  )
}

export function PreviewGithub({ repoUrl = "" }) {
  const [buttonText, setButtonText] = useState("GitHub")
  const [buttonEmoji, setButtonEmoji] = useState("👨‍💻")

  function handleButtonClick() {
    window.open(repoUrl, "_blank")
  }

  return (
    <button className="block" onClick={handleButtonClick}>
      <ButtonStyle
        buttonEmoji={buttonEmoji}
        buttonText={buttonText}
        buttonActive={false}
        isDark={false}
        classAdd={""}
      />
    </button>
  )
}

export function PreviewWebsite({ websiteUrl = "" }) {
  const [buttonText, setButtonText] = useState("Website")
  const [buttonEmoji, setButtonEmoji] = useState("🌐")

  function handleButtonClick() {
    window.open(websiteUrl, "_blank")
  }

  return (
    <button className="block" onClick={handleButtonClick}>
      <ButtonStyle
        buttonEmoji={buttonEmoji}
        buttonText={buttonText}
        buttonActive={false}
        isDark={false}
        classAdd={""}
      />
    </button>
  )
}

export function PreviewConfig({
  componentData,
  type,
  categories,
}: {
  componentData: HookType | ResourcePost
  type: string
  categories?: CategoryType[]
}) {
  const [buttonText, setButtonText] = useState("Menu")
  const [buttonEmoji, setButtonEmoji] = useState("🔁")

  if (type === "hook" && categories) {
    return (
      <Dialog>
        <AlertDialog>
          <button className="block">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <ButtonStyle
                  buttonEmoji={buttonEmoji}
                  buttonText={buttonText}
                  buttonActive={false}
                  isDark={false}
                  classAdd={""}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Hook menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  disabled={
                    componentData.status === "declined" ||
                    !(componentData as HookType).website
                  }
                >
                  <Link
                    target="_blank"
                    className="w-full text-left"
                    href={(componentData as HookType).website || ""}
                  >
                    Open website
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <DialogTrigger className="w-full text-left">
                    Edit
                  </DialogTrigger>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <AlertDialogTrigger className="w-full text-left">
                    Delete
                  </AlertDialogTrigger>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </button>
          <DeleteHook id={componentData.id} />
        </AlertDialog>
        <EditHook
          hookData={componentData as HookType}
          categories={categories}
        />
      </Dialog>
    )
  } else {
    return (
      <Dialog>
        <AlertDialog>
          <button className="block">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <ButtonStyle
                  buttonEmoji={buttonEmoji}
                  buttonText={buttonText}
                  buttonActive={false}
                  isDark={false}
                  classAdd={""}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Resource menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  disabled={componentData.status === "declined"}
                >
                  <Link
                    target="_blank"
                    className="w-full text-left"
                    href={(componentData as ResourcePost).resourceUrl}
                  >
                    Open link
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={componentData.status === "published"}
                >
                  <DialogTrigger className="w-full text-left">
                    Edit
                  </DialogTrigger>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <AlertDialogTrigger className="w-full text-left">
                    Delete
                  </AlertDialogTrigger>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </button>
          <DeleteResource id={componentData.id} />
        </AlertDialog>
        <EditResource resourceData={componentData as ResourcePost} />
      </Dialog>
    )
  }
}

export function PreviewFolder({ url = "" }) {
  const [buttonText, setButtonText] = useState("Files")
  const [buttonEmoji, setButtonEmoji] = useState("📂")

  function handleButtonClick() {
    window.open(url)
  }

  return (
    <button className="block" onClick={handleButtonClick}>
      <ButtonStyle
        buttonEmoji={buttonEmoji}
        buttonText={buttonText}
        buttonActive={false}
        isDark={false}
        classAdd={""}
      />
    </button>
  )
}
