import { ButtonStyle } from "@/components/ui/buttonStyle"

export function PreviewView({
  showPreview,
  handleSetShowPreview,
}: {
  showPreview: boolean
  handleSetShowPreview: any
}) {
  return (
    <button onClick={() => handleSetShowPreview(!showPreview)}>
      <ButtonStyle
        buttonEmoji="👀"
        buttonText="View"
        buttonActive={!showPreview}
        isDark={false}
        classAdd={""}
      />
    </button>
  )
}
