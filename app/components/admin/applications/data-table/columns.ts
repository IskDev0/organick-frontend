import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import type { IApplication } from "~/types/admin/IApplication";
import getDateFull from "~/utils/date/getDateFull";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Eye } from "lucide-vue-next";
import DeleteApplicationModal from "~/components/admin/applications/DeleteApplicationModal.vue";
import UpdateApplicationStatusModal from "~/components/admin/applications/UpdateApplicationStatusModal.vue";
import ApplicationInfoModal from "~/components/admin/applications/ApplicationInfoModal.vue";

function getStatusColor(status: string): string {
  switch (status) {
    case "new":
      return "bg-blue-400 text-white";
    case "pending":
      return "bg-yellow-400 text-white";
    case "accepted":
      return "bg-emerald-400 text-white";
    case "rejected":
      return "bg-red-400 text-white";
    default:
      return "bg-gray-400 text-white";
  }
}

const rowStates = reactive<any>({});

export const columns: ColumnDef<IApplication>[] = [
  {
    id: "index",
    header: () => h("div", "№"),
    cell: ({ row }) => {
      return h("div", { class: "font-medium" }, row.index + 1);
    },
  },
  {
    accessorKey: "fullName",
    header: () => h("div", "Full name"),
    cell: ({ row }) => {
      return h("div", { class: "font-medium" }, row.getValue("fullName"));
    },
  },
  {
    accessorKey: "status",
    header: () => h("div", "Status"),
    cell: ({ row }) => {
      return h(
        Badge,
        {
          class: getStatusColor(row.getValue("status")),
        },
        row.getValue("status"),
      );
    },
  },
  {
    accessorKey: "email",
    header: () => h("div", "Email"),
    cell: ({ row }) => {
      return h("div", { class: "font-medium" }, row.getValue("email"));
    },
  },
  {
    accessorKey: "company",
    header: () => h("div", "Company"),
    cell: ({ row }) => {
      return h("div", { class: "font-medium" }, row.getValue("company"));
    },
  },
  {
    accessorKey: "subject",
    header: () => h("div", "Subject"),
    cell: ({ row }) => {
      return h("div", { class: "font-medium" }, row.getValue("subject"));
    },
  },
  {
    accessorKey: "createdAt",
    header: () => h("div", "Date"),
    cell: ({ row }) => {
      let formatedDate = getDateFull(row.getValue("createdAt"));

      return h("div", { class: "font-medium" }, formatedDate);
    },
  },
  {
    id: "actions",
    header: () => h("div", ""),

    cell: ({ row }) => {
      let applicationId = row.original.id;

      if (!rowStates[applicationId]) {
        rowStates[applicationId] = {
          deleteModalOpen: false,
          updateStatusModalOpen: false,
        };
      }

      return h(
        "div",
        { class: "w-full flex items-center justify-end", size: "sm" },
        [
          h(ApplicationInfoModal, {
            application: row.original,
          }),
          h(UpdateApplicationStatusModal, {
            id: applicationId,
            open: rowStates[applicationId].updateStatusModalOpen,
            "onUpdate:open": (value) => {
              rowStates[applicationId].updateStatusModalOpen = value;
            },
          }),
          h(DeleteApplicationModal, {
            id: applicationId,
            open: rowStates[applicationId].deleteModalOpen,
            "onUpdate:open": (value) => {
              rowStates[applicationId].deleteModalOpen = value;
            },
            onDeleted: () => {
              rowStates[applicationId].deleteModalOpen = false;
            },
          }),
        ],
      );
    },
  },
];
