import { Icons } from "@component/overall/Icons";
import { Button } from "@component/ui/Button";

export default function CopyButtons() {
  return (
    <div className="flex items-center space-x-3">
      <Button size="icon" variant="outline" className="w-5 h-5">
        <Icons.copy />
      </Button>
      <Button size="icon" variant="outline" className="w-5 h-5">
        <Icons.link />
      </Button>
    </div>
  );
}
