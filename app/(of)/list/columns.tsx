"use client";

import { ColumnDef } from "@tanstack/react-table";

import ActionDialog from "@/components/actions/action-dialog";
import { Of } from "@prisma/client";
import { format } from "date-fns";

export const columns: ColumnDef<Of>[] = [
  {
    accessorKey: "article",
    header: "OF",
  },
  {
    accessorKey: "plannedAt",
    header: "Date de lancement",
    cell: ({ row }) => {
      const of = row.original;
      const date = format(of.planedAt, "PPP");
      return <div>{date}</div>;
    },
  },
  {
    accessorKey: "quantity",
    header: () => <div className="text-right">Quantite lancee</div>,
    cell: ({ row }) => {
      const of = row.original;
      return <div className="text-right font-medium">{of.quantity}</div>;
    },
  },
  {
    accessorKey: "target",
    header: "Niveau",
  },
  {
    accessorKey: "quantityDone",
    header: () => <div className="text-right">Quantite realisee</div>,
    cell: ({ row }) => {
      const of = row.original;
      return <div className="text-right font-medium">{of.quantityDone}</div>;
    },
  },
  {
    accessorKey: "comment",
    header: "Commentaire",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const of = row.original;

      return (
        <div className="flex gap-2">
          <ActionDialog id={of.id} />
        </div>
      );
    },
  },
];
