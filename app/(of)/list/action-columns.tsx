"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DeleteOf } from "@/components/of/delete-of";
import UpdateDialog from "@/components/of/update-of-dialog";
import { Action, Of } from "@prisma/client";
import { format } from "date-fns";

export const columns: ColumnDef<Action>[] = [
  {
    accessorKey: "createdAt",
    header: "Date d'ajout",
    cell: ({ row }) => {
      const action = row.original;
      const date = format(action.createdAt, "PPP");
      return <div>{date}</div>;
    },
  },
  {
    accessorKey: "userId",
    header: "ID Utilisateur",
  },
  {
    accessorKey: "id",
    header: "ID OF",
  },
  {
    accessorKey: "comment",
    header: "Commentaire",
  },

  {
    accessorKey: "quantity",
    header: () => <div className="text-right">Quantite</div>,
    cell: ({ row }) => {
      const of = row.original;
      return <div className="text-right font-medium">{of.quantity}</div>;
    },
  },
  // {
  //   id: "actions",
  //   header: "Actions",
  //   cell: ({ row }) => {
  //     const of = row.original;

  //     return (
  //       <div className="flex gap-2">
  //         <UpdateDialog id={of.id} />
  //         <DeleteOf id={of.id} />
  //       </div>
  //     );
  //   },
  // },
];
