import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@component/ui/AlertDialog";

export default function DeleteHook({ id }: { id: string }) {
  async function deleteHook() {
    try {
      await fetch(`/api/hook/${id}`, {
        method: "DELETE",
      });

      window.location.reload();
    } catch (error) {
      console.log("Error deleting hook", error);
    }
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your hook
          from our database.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={deleteHook}>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
