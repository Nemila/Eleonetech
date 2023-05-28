import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export function DeleteOf({ id }: { id: string }) {
  const router = useRouter();

  const deleteOf = async () => {
    const response = await fetch(`/api/ofs/${id}`, {
      method: "DELETE",
    });

    if (!response?.ok) {
      return console.log("Something went wrong");
    }

    console.log("Everything is ok!");
    return router.refresh();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="h-10 w-10 p-0">
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Etes vous sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action va supprimer cet OF de facon definitive. Vous ne
            pourrez plus recuperez les informations supprimees.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={deleteOf}>Supprimer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
