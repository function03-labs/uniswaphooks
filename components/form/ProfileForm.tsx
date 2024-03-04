"use client";
import * as z from "zod";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "@hooks/use-toast";
import { manageImage } from "@/lib/storage";
import { userSchema } from "@/config/schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@component/ui/Form";
import { Input } from "@component/ui/Input";
import { Button } from "@component/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@component/ui/Avatar";

export default function ProfileForm({ user }: { user: any }) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(user.image);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.size < 1000000) {
      setSelectedImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    } else {
      toast({
        title: "Image size too large",
        description: "Please select an image smaller than 1MB.",
        variant: "destructive",
      });

      e.target.value = "";
      setSelectedImage(null);
    }
  };

  async function onSubmit(values: z.infer<typeof userSchema>) {
    setLoading(true);

    let imageUrl;
    if (selectedImage) {
      imageUrl = await manageImage(selectedImage, user.id);
      setImagePreviewUrl(imageUrl);
    }

    try {
      const res = await fetch(`/api/profile/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, image: imageUrl }),
      });
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to update profile",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }

    setLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="py-4 px-2 space-y-4 md:w-1/2 lg:w-1/3"
      >
        <FormLabel>Profile image</FormLabel>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        <Avatar
          className="h-20 w-20 cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <AvatarImage src={imagePreviewUrl} />
          <AvatarFallback>
            {user.email ? user.email[0].toUpperCase() : "U"}
          </AvatarFallback>
        </Avatar>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your profile name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input disabled {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {loading ? (
          <Button
            className="inline-flex items-center rounded-md border-2 border-current bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 transition hover:-rotate-2 hover:scale-110 hover:bg-white focus:outline-none focus:ring active:text-pink-500"
            type="submit"
          >
            🔃Updating...
          </Button>
        ) : (
          <Button
            className="inline-flex items-center rounded-md border-2 border-current bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 transition hover:-rotate-2 hover:scale-110 hover:bg-white focus:outline-none focus:ring active:text-pink-500"
            type="submit"
          >
            ☑️ Update Profile
          </Button>
        )}
      </form>
    </Form>
  );
}
