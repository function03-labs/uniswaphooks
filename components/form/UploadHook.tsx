"use client";

import * as z from "zod";
import admZip from "adm-zip";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { supabase } from "@/lib/supabase";
import { useToast } from "@hooks/use-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@component/ui/Form";
import { Input } from "@component/ui/Input";
import { Button } from "@component/ui/Button";
import { Icons } from "@component/overall/Icons";

const githubUrlRegex =
  /^https?:\/\/github\.com\/(?<username>[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38})\/(?<repository>[a-z\d_\-]{1,100})(?:\.git)?$/i;

const hookSchema = z.object({
  github: z.string().regex(githubUrlRegex).optional(),
});

export default function UploadHook({ id }: { id: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isDecompressing, setIsDecompressing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const form = useForm<z.infer<typeof hookSchema>>({
    resolver: zodResolver(hookSchema),
  });

  const uploadFiles = async ({ id, files }: { id: string; files: void }) => {
    const { data, error } = await supabase.storage.from("repositories").upload(
      `${id}/*`,
      files as any,
      {
        upsert: true,
        progress: (progress: number) => {
          setUploadProgress(progress);
        },
      } as any
    );

    if (error) {
      console.error("Error uploading files:", error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (file) {
      const allowedExtensions = ["zip", "rar", "tar", "tgz"];
      const fileExtension = file.name.split(".").pop()?.toLowerCase() as string;

      if (allowedExtensions.includes(fileExtension)) {
        setSelectedFile(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a ZIP, RAR, TAR, or TGZ file.",
          variant: "destructive",
        });
      }
    } else {
      setSelectedFile(null);
    }
  };

  async function onSubmit(values: z.infer<typeof hookSchema>) {
    setIsDecompressing(true);

    try {
      if (!selectedFile) {
        throw new Error("No file selected");
      }

      const decompressedFiles = await fetch("/api/upload", {
        method: "POST",
        body: selectedFile,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            throw new Error(data.error);
          }

          return data;
        });

      console.log(decompressedFiles);

      setIsDecompressing(false);
      setIsUploading(true);

      await uploadFiles({ id, files: decompressedFiles as unknown as void });

      setIsUploading(false);

      try {
        const data = await fetch(`/api/hook/${id}`, {
          method: "PUT",
          body: JSON.stringify({
            ...values,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const response = await data.json();

        router.push(
          `/dashboard/hook/submit?id=${response.data.id}&step=deployment`
        );
      } catch (error) {
        console.error("Submission error:", error);
        // router.push("/error");
      }

    } catch (error) {
      console.error("Error processing file:", error);
      setIsDecompressing(false);
      setIsUploading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="github"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub Repository</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://github.com/author/repo..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter the URL of your GitHub repository.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-950/40 px-6 py-10">
          <div className="text-center">
            {selectedFile ? (
              <>
                <Icons.folderOpen
                  className="mx-auto h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <span className="mt-4 block text-sm font-semibold text-gray-600">
                  Uploaded repository
                </span>
                <div className="mt-4 text-sm leading-6 text-gray-600">
                  {selectedFile.name}
                </div>
              </>
            ) : (
              <>
                <Icons.folder
                  className="mx-auto h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                  >
                    <span>Upload a repository</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      accept=".zip, .rar, .tar, .tgz"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  ZIP, RAR, TAR, and TGZ files are supported.
                </p>
              </>
            )}
          </div>
        </div>

        {isDecompressing ? (
          <p>Decompressing file...</p>
        ) : isUploading ? (
          <div className="flex items-center space-x-2">
            <svg
              className="animate-spin h-5 w-5 text-gray-900"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <p>Uploading: {Math.round(uploadProgress * 100)}%</p>
          </div>
        ) : (
          <Button
            className="inline-flex w-full items-center rounded-md border-2 border-current bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 transition hover:-rotate-2 hover:scale-110 hover:bg-white focus:outline-none focus:ring active:text-pink-500"
            type="submit"
          >
            ☑️ Upload
          </Button>
        )}
      </form>
    </Form>
  );
}
