import { Pen } from "lucide-react";

import UpdateOf from "@/components/of/update-of";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const UpdateDialog = ({ id }: { id: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-10 w-10 p-0">
          <Pen className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier OF</DialogTitle>
          <DialogDescription>
            Apportez des modifications a l&apos;OF.
          </DialogDescription>
        </DialogHeader>
        <UpdateOf id={id} />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDialog;
