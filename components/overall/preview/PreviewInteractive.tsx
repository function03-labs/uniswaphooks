import { ButtonStyle } from "@/components/ui/buttonStyle"

export function PreviewInteractive({
  isInteractive,
  handleSetIsInteractive,
}: {
  isInteractive: boolean
  handleSetIsInteractive: (isInteractive: boolean) => void
}) {
  return (
    <button onClick={() => handleSetIsInteractive(!isInteractive)}>
      <ButtonStyle
        buttonEmoji={isInteractive ? "🙋‍♀️" : "🙅‍♀️"}
        buttonText="Alpine JS"
        buttonActive={isInteractive}
        isDark={false}
        classAdd={""}
      />
    </button>
  )
}
