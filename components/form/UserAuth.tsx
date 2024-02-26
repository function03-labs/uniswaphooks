"use client";

import * as z from "zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";

import { cn } from "@lib/utils";
import { userAuthSchema } from "@config/schema";
import { buttonVariants } from "@component/ui/Button";
import { Input } from "@component/ui/Input";
import { Label } from "@component/ui/Label";
import { Icons } from "@component/overall/Icons";

import { toast } from "@hooks/use-toast";
import { supabaseAdmin } from "@lib/supabase";
import { zodResolver } from "@hookform/resolvers/zod";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    const { data: magicLinkData, error } =
      await supabaseAdmin.auth.admin.generateLink({
        type: "magiclink",
        email: data.email.toLowerCase(),
      });

    const mailerResponse = await fetch("/api/mailer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...magicLinkData.properties,
        email: magicLinkData.user?.email,
        type: "magic-link",
      }),
    });

    setIsLoading(false);

    // TODO: Check the rate limit of the mailer

    if (error) {
      console.error("Error signing in with email:", error);
      return toast({
        title: "Something went wrong.",
        description: "Your sign in request failed. Please try again.",
        variant: "destructive",
      });
    }

    // TODO: Show case that you can close this page and open the link in the email
    // TODO: The link in the email should redirect to the dashboard

    return toast({
      title: "Check your email",
      description: "We sent you a login link. Be sure to check your spam too.",
    });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || isGitHubLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </button>
        </div>
      </form>
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
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={async () => {
          setIsGitHubLoading(true);
          await supabaseAdmin.auth.signInWithOAuth({
            provider: "github",
          });
        }}
        disabled={isLoading || isGitHubLoading}
      >
        {isGitHubLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </button>
    </div>
  );
}
