"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { deployHookSchema } from "@config/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@hooks/use-toast"
import {
  getCreatorTx,
  getDeploymentDate,
  getSourceCode,
  getVerified,
} from "@lib/hook-deployment"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { DeploymentType } from "@/types/deployment"

import { Button } from "@/components/ui/Button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { DeploymentDetails } from "@/components/showcase/DeploymentDetails"

export function DeployHook({ id }: { id: string }) {
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [updating, setUpdating] = useState("not-visible")
  const [deployementData, setDeploymentData] = useState<DeploymentType>({
    verified: false,
  } as DeploymentType)
  const form = useForm<z.infer<typeof deployHookSchema>>({
    resolver: zodResolver(deployHookSchema),
  })

  async function onSubmit(values: z.infer<typeof deployHookSchema>) {
    setLoading(true)

    if (!values.deploymentAddress || !values.network) {
      setLoading(false)
      return
    }

    try {
      const verified = await getVerified({
        address: `address=${values.deploymentAddress}`,
        network: values.network,
      })

      setDeploymentData({
        ...deployementData,
        verified,
        input: {
          deploymentAddress: values.deploymentAddress,
          network: values.network,
        },
      })

      if (!verified) {
        setLoading(false)
        return
      }

      const sourceCode = await getSourceCode({
        address: `address=${values.deploymentAddress}`,
        network: values.network,
      })
      const creator = await getCreatorTx({
        address: `contractaddresses=${values.deploymentAddress}`,
        network: values.network,
      })

      // TODO: Get Deployment Date -> 'date'
      const date = await getDeploymentDate()

      setDeploymentData({
        ...deployementData,
        input: {
          deploymentAddress: values.deploymentAddress || "Unknown address",
          network: values.network || "Unknown network",
        },
        imageUrl: "/uniswap-hooks-logo.png",
        networkName: values.network === "api" ? "Mainnet" : "Sepolia",
        verified,
        contract: {
          deploymentAddress: values.deploymentAddress || "Unknown address",
          contractName: sourceCode.contractName || "Unknown contract",
          compilerVersion: sourceCode.compilerVersion || "Unknown version",
          creator: creator.creator || "Unknown creator",
          transactionHash: creator.transactionHash || "Unknown transaction",
        },
        date: date || "Unknown date",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }

    setLoading(false)
    setUpdating("visible")
  }

  async function updateHook() {
    setLoading(true)
    setUpdating("loading")

    try {
      const requestUpdate = await fetch(`/api/hook/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          status: "pending",
          network: {
            name: deployementData.networkName,
            imageUrl: deployementData.imageUrl,
            verified: deployementData.verified,
          },
          contract: {
            contractName: deployementData.contract?.contractName,
            deploymentAddress: deployementData.contract?.deploymentAddress,
            compilerVersion: deployementData.contract?.compilerVersion,
            creator: deployementData.contract?.creator,
            transactionHash: deployementData.contract?.transactionHash,
          },
          deploymentDate: deployementData.date,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (requestUpdate.status !== 204) {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        })
        throw new Error("Error updating hook")
      }

      toast({
        title: "Success",
        description: "Your hook has been submitted successfully.",
      })

      router.push(`/dashboard/hook/submit?id=${id}&step=submission`)

      const hook = await fetch(`/api/hook/${id}`)
      const hookData = await hook.json()

      await fetch("/api/mailer", {
        method: "POST",
        body: JSON.stringify({
          id: hookData.id,
          title: hookData.title,
          description: hookData.description,
          creator: hookData.creator,
          github: hookData.github,
          type: "hooks",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      console.log("Update error:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }

    setLoading(false)
    setUpdating("visible")
  }

  async function deployLater() {
    setLoading(true)
    setUpdating("loading")

    try {
      const requestUpdate = await fetch(`/api/hook/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          status: "pending",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (requestUpdate.status !== 204) {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        })
        throw new Error("Error updating hook")
      }

      toast({
        title: "Success",
        description: "Your hook has been submitted successfully.",
      })

      router.push(`/dashboard/hook/submit?id=${id}&step=submission`)

      const hook = await fetch(`/api/hook/${id}`)
      const hookData = await hook.json()

      await fetch("/api/mailer", {
        method: "POST",
        body: JSON.stringify({
          id: hookData.id,
          title: hookData.title,
          description: hookData.description,
          creator: hookData.creator,
          github: hookData.github,
          type: "hooks",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      console.log("Update error:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }
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
                <Input
                  placeholder="0x1234..."
                  {...field}
                  disabled={loading || updating === "loading"}
                />
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
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={loading || updating === "loading"}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a network" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem disabled value="api">
                    Mainnet (Soon...)
                  </SelectItem>
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

        <div className="gap-4 space-y-4 md:grid md:grid-cols-3 lg:space-y-0">
          <Button
            className="inline-flex w-full items-center rounded-md border-2 border-current bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 transition hover:-rotate-2 hover:scale-110 hover:bg-white focus:outline-none focus:ring active:text-pink-500 md:col-span-1"
            onClick={() => deployLater()}
          >
            ➡️Skip for now
          </Button>

          {loading ? (
            <Button
              disabled
              className="inline-flex w-full items-center rounded-md border-2 border-current bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 transition hover:-rotate-2 hover:scale-110 hover:bg-white focus:outline-none focus:ring active:text-pink-500 md:col-span-2"
              type="submit"
            >
              🔃Deploying...
            </Button>
          ) : (
            <Button
              className="inline-flex w-full items-center rounded-md border-2 border-current bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 transition hover:-rotate-2 hover:scale-110 hover:bg-white focus:outline-none focus:ring active:text-pink-500 md:col-span-2"
              type="submit"
            >
              ☑️Deploy Hook
            </Button>
          )}
        </div>

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
  )
}
