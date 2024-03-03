"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "@hooks/use-toast";
import { deployHookSchema } from "@config/schema";
import { DeploymentType } from "@/types/deployment";
import {
  getVerified,
  getSourceCode,
  getCreatorTx,
  getDeploymentDate,
} from "@lib/hook-deployment";

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
import DeploymentDetails from "@component/showcase/DeploymentDetails";

export default function DeployHook({ id }: { id: string }) {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState("not-visible");
  const [deployementData, setDeploymentData] = useState<DeploymentType>({
    verified: false,
  } as DeploymentType);
  const form = useForm<z.infer<typeof deployHookSchema>>({
    resolver: zodResolver(deployHookSchema),
  });

  async function onSubmit(values: z.infer<typeof deployHookSchema>) {
    setLoading(true);

    try {
      const verified = await getVerified({
        address: `address=${values.deploymentAddress}`,
        network: values.network,
      });

      setDeploymentData({
        ...deployementData,
        verified,
        input: {
          deploymentAddress: values.deploymentAddress,
          network: values.network,
        },
      });

      if (!verified) {
        setLoading(false);
        return;
      }

      const sourceCode = await getSourceCode({
        address: `address=${values.deploymentAddress}`,
        network: values.network,
      });
      const creator = await getCreatorTx({
        address: `contractaddresses=${values.deploymentAddress}`,
        network: values.network,
      });

      // TODO: Get Deployment Date -> 'date'
      const date = await getDeploymentDate();

      setDeploymentData({
        ...deployementData,
        input: {
          deploymentAddress: values.deploymentAddress,
          network: values.network,
        },
        imageUrl: "/uniswap-hooks-logo.png",
        networkName: values.network === "api" ? "Mainnet" : "Sepolia",
        verified,
        contract: {
          contractName: sourceCode.contractName,
          compilerVersion: sourceCode.compilerVersion,
          creator: creator.creator,
          transactionHash: creator.transactionHash,
        },
        date: date,
      });
    } catch (error) {
      console.log("Submission error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }

    setLoading(false);
    setUpdating("visible");
  }

  async function updateHook() {
    setLoading(true);
    setUpdating("loading");

    try {
      const requestUpdate = await fetch(`/api/hook/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          network: {
            name: deployementData.networkName,
            imageUrl: deployementData.imageUrl,
            verified: deployementData.verified,
          },
          contract: {
            name: deployementData.contract!.contractName,
            compilerVersion: deployementData.contract!.compilerVersion,
            creator: deployementData.contract?.creator,
            transactionHash: deployementData.contract?.transactionHash,
          },
          deploymentDate: deployementData.date,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (requestUpdate.status !== 204) {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
        throw new Error("Error updating hook");
      }

      toast({
        title: "Success",
        description: "Your hook has been submitted successfully.",
      });

      router.push(`/dashboard/hook/submit?id=${id}&step=submission`);

      const hook = await fetch(`/api/hook/${id}`);
      const hookData = await hook.json();

      await fetch("/api/mailer", {
        method: "POST",
        body: JSON.stringify({
          title: hookData.title,
          description: hookData.description,
          creator: hookData.creator,
          github: hookData.github,
          type: "hooks",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log("Update error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }

    setLoading(false);
    setUpdating("visible");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="deploymentAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deployment address</FormLabel>
              <FormControl>
                <Input placeholder="0x1234..." {...field} />
              </FormControl>
              <FormDescription>
                Enter the address of your deployed hook.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="network"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Network</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a network" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="api">Mainnet</SelectItem>
                  <SelectItem value="api-sepolia">Sepolia</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Enter the network ID of your deployed hook.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {deployementData.imageUrl && (
          <DeploymentDetails deployment={deployementData} />
        )}

        {loading ? (
          <Button
            disabled
            className="inline-flex w-full items-center rounded-md border-2 border-current bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 transition hover:-rotate-2 hover:scale-110 hover:bg-white focus:outline-none focus:ring active:text-pink-500"
            type="submit"
          >
            🔃Deploying...
          </Button>
        ) : (
          <Button
            className="inline-flex w-full items-center rounded-md border-2 border-current bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 transition hover:-rotate-2 hover:scale-110 hover:bg-white focus:outline-none focus:ring active:text-pink-500"
            type="submit"
          >
            ☑️Deploy Hook
          </Button>
        )}

        {updating === "visible" && (
          <Button
            onClick={() => updateHook()}
            className="inline-flex w-full items-center rounded-md border-2 border-current bg-black px-3 py-1.5 text-xs font-semibold text-gray-50 transition hover:-rotate-2 hover:scale-110 hover:bg-gray-900 focus:outline-none focus:ring active:text-pink-500"
          >
            ✅Update Hook
          </Button>
        )}
        {updating === "loading" && (
          <Button
            disabled
            className="inline-flex w-full items-center rounded-md border-2 border-current bg-black px-3 py-1.5 text-xs font-semibold text-gray-50 transition hover:-rotate-2 hover:scale-110 hover:bg-gray-900 focus:outline-none focus:ring active:text-pink-500"
          >
            ✅Update Hook
          </Button>
        )}
      </form>
    </Form>
  );
}
