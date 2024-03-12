"use client";

import * as z from "zod";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@component/ui/Form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@component/ui/Select";

import { HookType } from "@/types/hook";

const hookSchema = z.object({
  status: z.string(),
});

export function PreviewStatus({
  componentData,
  role,
}: {
  componentData: HookType;
  role: string;
}) {
  const { toast } = useToast();
  const [isSelectVisible, setIsSelectVisible] = useState(false);
  const form = useForm<z.infer<typeof hookSchema>>({
    resolver: zodResolver(hookSchema),
    defaultValues: {
      status: componentData.status,
    },
  });

  async function onSubmit(data: z.infer<typeof hookSchema>) {
    try {
      const updatedHook = await fetch(`/api/hook/${componentData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...componentData,
          status: data.status,
        }),
      });

      if (!updatedHook.ok) {
        throw new Error("Failed to update hook");
      }

      toast({
        title: "Hook updated",
        description: "The hook has been updated.",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to update hook",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      form.reset();
      window.location.reload();
    }
  }
  const isPublished = componentData.status === "published";
  const isPending = componentData.status === "pending";
  const isDraft = componentData.status === "draft";
  const isDeclined = componentData.status === "declined";

  if (!isPublished && !isPending && !isDeclined && !isDraft) {
    return <></>;
  }

  if (role === "admin") {
    return (
      <div className="block mt-1">
        {!isSelectVisible && (
          <button
            className={`inline-flex items-center gap-1.5 rounded-lg border-2 px-3 py-1.5 border-gray-900 ${
              isPublished && "bg-green-700 text-green-100"
            } ${isPending && "bg-yellow-700 text-yellow-100"} ${
              isDeclined && "bg-red-700 text-red-100"
            } ${isDraft && "bg-gray-700 text-gray-100"}`}
            onClick={() => setIsSelectVisible(!isSelectVisible)}
          >
            <span className="text-xs font-medium">
              {componentData.status.charAt(0).toUpperCase() +
                componentData.status.slice(1)}
            </span>
          </button>
        )}
        {isSelectVisible && (
          <Form {...form}>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Select
                    onValueChange={async (value) => {
                      field.onChange(value);
                      await onSubmit({ status: value });
                      setIsSelectVisible(false);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="published">✅Approved</SelectItem>
                      <SelectItem value="pending">🟨Pending</SelectItem>
                      <SelectItem value="draft">⬛Draft</SelectItem>
                      <SelectItem value="declined">❌Declined</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
        )}
      </div>
    );
  }

  return (
    <button className="block mt-1">
      <span
        className={`inline-flex items-center gap-1.5 rounded-lg border-2 px-3 py-1.5 border-gray-900 ${
          isPublished && "bg-green-700 text-green-100"
        } ${isPending && "bg-yellow-700 text-yellow-100"} ${
          isDeclined && "bg-red-700 text-red-100"
        } ${isDraft && "bg-gray-700 text-gray-100"}`}
      >
        <span className="text-xs font-medium">
          {componentData.status.charAt(0).toUpperCase() +
            componentData.status.slice(1)}
        </span>
      </span>
    </button>
  );
}
