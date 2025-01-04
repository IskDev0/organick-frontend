import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import type { UserInfo } from "~/types/UserInfo";
import UserRoleDropdown from "~/components/admin/users/data-table/UserRoleDropdown.vue";
import DeleteUserModal from "~/components/admin/users/data-table/DeleteUserModal.vue";

export const columns: ColumnDef<UserInfo>[] = [
  {
    accessorFn: (row) => row.firstName + " " + row.lastName,
    id: "fullname",
    header: () => h("div", { class: "text-left" }, "Full Name"),
    cell: ({ row }) => {
      return h(
        "div",
        { class: "text-left" },
        row.original.firstName + " " + row.original.lastName,
      );
    },
  },
  {
    accessorKey: "email",
    header: () => h("div", { class: "text-center" }, "Email"),
    cell: ({ row }) => {
      return h("div", { class: "text-center" }, row.getValue("email"));
    },
  },
  {
    accessorKey: "phone",
    header: () => h("div", { class: "text-center" }, "Phone"),
    cell: ({ row }) => {
      return h("div", { class: "text-center" }, row.getValue("phone"));
    },
  },
  {
    accessorKey: "role",
    header: () => h("div", { class: "text-center" }, "Role"),
    cell: ({ row }) => {
      return h(
        "div",
        { class: "flex justify-center" },
        h(UserRoleDropdown, {
          role: row.getValue("role"),
          id: row.original.id,
        }),
      );
    },
  },
  {
    id: "actions",
    header: () => h("div", { class: "text-center" }, ""),
    cell: ({row}) => {
      return h(DeleteUserModal, {
        class: "flex justify-center",
        id: row.original.id,
        open: row.original.open,
        "onUpdate:open": (open: boolean) => {row.original.open = open}
      });
    },
  }
];
