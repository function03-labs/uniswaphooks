import ButtonStyle from "@component/ui/ButtonStyle";

export default function PreviewView({
  showPreview,
  handleSetShowPreview,
}: {
  showPreview: boolean;
  handleSetShowPreview: any;
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
  );
}
