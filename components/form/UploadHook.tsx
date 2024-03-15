"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "@hooks/use-toast";
import { supabase } from "@lib/supabase";

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

const hookSchema = z
  .object({
    github: z
      .string()
      .refine((value) => githubUrlRegex.test(value), {
        message: "Invalid GitHub URL",
      })
      .optional(),
    file: z
      .instanceof(File, {
        message: "Please upload a file, such as a ZIP, RAR, TAR, or TGZ file",
      })
      .optional(),
  })
  .refine(
    (data) => {
      const hasGithub = Boolean(data.github);
      const hasFile = Boolean(data.file);

      if (!hasGithub && !hasFile) {
        return false;
      }

      if (hasGithub && hasFile) {
        return false;
      }

      return true;
    },
    {
      message: "Either a GitHub URL or a file must be provided, but not both",
    }
  );

export default function UploadHook({ id }: { id: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const form = useForm<z.infer<typeof hookSchema>>({
    resolver: zodResolver(hookSchema),
  });

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
        return false;
      }
    } else {
      setSelectedFile(null);
    }

    return true;
  };

  async function onSubmit(values: z.infer<typeof hookSchema>) {
    setIsProcessing(true);

    try {
      let response;
      let value = {
        storageType: "",
        filePath: "",
      };

      if (selectedFile && !values.github) {
        console.log("selectedFile", selectedFile);
        response = await fetch(`/api/decompress`, {
          method: "POST",
          body: selectedFile,
        });

        if (!response?.ok) {
          throw new Error("Failed to upload files");
        }

        const data = await response.json();

        const files = data.files.map((file: any) => {
          return new File([file.content], file.name, {
            type: file.type,
          });
        });

        const uploadPromises = files.map((file: any) => {
          const filePath = `${id}/${file.name}`;
          return supabase.storage.from("repositories").upload(filePath, file);
        });

        await Promise.all(uploadPromises);

        value.storageType = "storage";
        value.filePath =
          process.env.NEXT_PUBLIC_SUPABASE_URL +
          "/storage/v1/object/public/repositories/" +
          id;
      } else {
        value.storageType = "github";
        value.filePath = values.github!;
      }

      await fetch(`/api/hook/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      router.push(`/dashboard/hook/submit?id=${id}&step=deployment`);
    } catch (error) {
      console.log("Error processing file:", error);
      toast({
        title: "Failed to upload files",
        description: "Please try again later",
        variant: "destructive",
      });
    }
    setIsProcessing(false);
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
                  disabled={isProcessing}
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

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
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

                          {isProcessing ? (
                            <div className="flex items-center justify-center">
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
                            </div>
                          ) : (
                            <Button
                              variant="destructive"
                              size={"sm"}
                              className="mt-4 text-xs font-semibold"
                              onClick={() => {
                                setSelectedFile(null);
                                field.onChange(null);
                              }}
                            >
                              Remove
                            </Button>
                          )}
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
                              <Input
                                id="file-upload"
                                type="file"
                                placeholder="shadcn"
                                accept=".zip, .rar, .tar, .tgz"
                                className="sr-only"
                                onChange={(event) => {
                                  const file = event.target.files?.[0] || null;

                                  if (handleFileChange(event)) {
                                    setSelectedFile(file);
                                    field.onChange(file);
                                  }
                                }}
                                onBlur={field.onBlur}
                                ref={field.ref}
                              />
                            </label>
                            <p className="pl-1">from your computer</p>
                          </div>
                          <p className="text-xs leading-5 text-gray-600">
                            ZIP, RAR, TAR, and TGZ files are supported.
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {form.getValues("file") && form.getValues("github") && (
          <div className="text-sm text-red-600">
            You can only provide a GitHub repository or a file, but not both.
          </div>
        )}

        <Button
          disabled={isProcessing}
          className="inline-flex w-full items-center rounded-md border-2 border-current bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 transition hover:-rotate-2 hover:scale-110 hover:bg-white focus:outline-none focus:ring active:text-pink-500"
          type="submit"
        >
          ☑️ Upload
        </Button>
      </form>
    </Form>
  );
}
