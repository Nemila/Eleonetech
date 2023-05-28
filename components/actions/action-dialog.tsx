import { Pen } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import NewAction from "./new-action";

const ActionDialog = ({ id }: { id: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-10 w-10 p-0">
          <Pen className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nouvel Action</DialogTitle>
          <DialogDescription>
            Ajoutez une nouvelle action pour augmenter la quantite realisee.
          </DialogDescription>
        </DialogHeader>
        <NewAction id={id} />
      </DialogContent>
    </Dialog>
  );
};

export default ActionDialog;
