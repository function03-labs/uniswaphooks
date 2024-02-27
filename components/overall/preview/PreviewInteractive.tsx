import ButtonStyle from "@component/ui/ButtonStyle";

export default function PreviewInteractive({
  isInteractive,
  handleSetIsInteractive,
}: {
  isInteractive: boolean;
  handleSetIsInteractive: (isInteractive: boolean) => void;
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
  );
}
