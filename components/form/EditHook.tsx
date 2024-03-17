"use client";

import * as z from "zod";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { ResourcePost } from "@/types/post";
import { hookEditSchema } from "@config/schema";
import { formatDeploymentDetails } from "@lib/utils";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@component/ui/Dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@component/ui/Form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@component/ui/Select";
import { Input } from "@component/ui/Input";
import { Button } from "@component/ui/Button";
import { Textarea } from "@component/ui/Textarea";
import DeploymentDetails from "@component/showcase/DeploymentDetails";

import { HookType } from "@/types/hook";

export default function EditHook({ hookData }: { hookData: HookType }) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<ResourcePost[]>([]);
  const deploymentDetails = formatDeploymentDetails(hookData);
  const form = useForm<z.infer<typeof hookEditSchema>>({
    resolver: zodResolver(hookEditSchema),
    defaultValues: {
      ...hookData,
      status: "pending",
    },
  });

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await fetch("/api/category");
        const response = await data.json();

        setCategories(response.data);
      } catch (error) {
        console.error("Category fetch error:", error);
      }
    }

    fetchCategories();
  }, []);

  async function onSubmit(values: z.infer<typeof hookEditSchema>) {
    setLoading(true);
    try {
      await fetch(`/api/hook/${hookData.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...values,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Submission error:", error);
    }
    setLoading(false);
  }

  return (
    <DialogContent className="max-w-[1200px]">
      <DialogHeader>
        <DialogTitle>Edit Hook</DialogTitle>
        <DialogDescription>Edit your hook with ease.</DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(onSubmit)();
          }}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-auto h-[80vh] md:h-auto">
            <div>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hook name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the name of your hook."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the name of your hook.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write a description for your hook. This will be displayed in the marketplace."
                        className="h-32 md:h-48"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a description for your hook.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem className="pb-4">
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.emoji} {category.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the website of your hook."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the website of your hook.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="h-6" />
              <DeploymentDetails deployment={deploymentDetails} />
              {!deploymentDetails.verified && (
                <Link
                  href={`/dashboard/hook/submit?id=${hookData.id}&step=deployment`}
                >
                  <Button className="py-2 w-full">📋Deploy now</Button>
                </Link>
              )}
            </div>
          </div>

          {loading ? (
            <Button
              className="inline-flex w-full items-center rounded-md border-2 border-current bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 transition hover:-rotate-2 hover:scale-110 hover:bg-white focus:outline-none focus:ring active:text-pink-500"
              type="submit"
            >
              🔃Submitting...
            </Button>
          ) : (
            <Button
              className="inline-flex w-full items-center rounded-md border-2 border-current bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 transition hover:-rotate-2 hover:scale-110 hover:bg-white focus:outline-none focus:ring active:text-pink-500"
              type="submit"
            >
              ☑️Submit
            </Button>
          )}
        </form>
      </Form>
    </DialogContent>
  );
}
