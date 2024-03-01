import Link from "next/link";
import { useState } from "react";
import { useCopyToClipboard } from "react-use";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@component/ui/DropdownMenu";
import { Dialog, DialogTrigger } from "@component/ui/Dialog";
import ButtonStyle from "@component/ui/ButtonStyle";
import { AlertDialog, AlertDialogTrigger } from "@component/ui/AlertDialog";

import EditHook from "@component/form/EditHook";
import DeleteHook from "@component/form/DeleteHook";

import { HookType } from "@/types/hook";

export default function PreviewCopy({ componentCode = "" }) {
  const [buttonText, setButtonText] = useState("Copy");
  const [buttonEmoji, setButtonEmoji] = useState("📋");
  const [copyStatus, copyToClipboard] = useCopyToClipboard();

  const buttonActive = buttonText === "Copied";

  function handleCopyToClipboard() {
    copyToClipboard(componentCode);

    if (copyStatus.error) {
      setButtonText("Error");
      setButtonEmoji("🚨");

      return;
    }

    setButtonText("Copied");
    setButtonEmoji("🎉");

    setTimeout(() => {
      setButtonText("Copy");
      setButtonEmoji("📋");
    }, 3000);
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
  );
}

export function PreviewGithub({ repoUrl = "" }) {
  const [buttonText, setButtonText] = useState("GitHub");
  const [buttonEmoji, setButtonEmoji] = useState("👨‍💻");

  function handleButtonClick() {
    window.open(repoUrl, "_blank");
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
  );
}

export function PreviewWebsite({ websiteUrl = "" }) {
  const [buttonText, setButtonText] = useState("Website");
  const [buttonEmoji, setButtonEmoji] = useState("🌐");

  function handleButtonClick() {
    window.open(websiteUrl, "_blank");
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
  );
}

export function PreviewConfig({ componentData }: { componentData: HookType }) {
  const [buttonText, setButtonText] = useState("Menu");
  const [buttonEmoji, setButtonEmoji] = useState("🔁");

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
              <DropdownMenuItem disabled={componentData.status === "declined"}>
                <Link target="_blank" href={componentData.github}>
                  Open GitHub
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem disabled={componentData.status === "published"}>
                <DialogTrigger>Edit</DialogTrigger>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <AlertDialogTrigger>Delete</AlertDialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </button>
        <DeleteHook id={componentData.id.toString()} />
      </AlertDialog>
      <EditHook hookData={componentData} />
    </Dialog>
  );
}

export function PreviewStatus({ tagType = "published" }) {
  const isPublished = tagType === "published";
  const isPending = tagType === "pending";
  const isDeclined = tagType === "declined";

  if (!isPublished && !isPending && !isDeclined) {
    return <></>;
  }

  return (
    <button className="block mt-1">
      <span
        className={`inline-flex items-center gap-1.5 rounded-lg border-2 px-3 py-1.5 border-gray-900 ${
          isPublished && "bg-green-700 text-green-100"
        } ${isPending && "bg-yellow-700 text-yellow-100"} ${
          isDeclined && "bg-red-700 text-red-100"
        }`}
      >
        <span className="text-xs font-medium">
          {tagType.charAt(0).toUpperCase() + tagType.slice(1)}
        </span>
      </span>
    </button>
  );
}

export function PreviewFolder({ repoUrl = "" }) {
  const [buttonText, setButtonText] = useState("Files");
  const [buttonEmoji, setButtonEmoji] = useState("📂");

  function handleButtonClick() {
    window.open(repoUrl, "_blank");
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
  );
}
