import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import type { UserInfo } from "~/types/UserInfo";
import UserRoleDropdown from "~/components/admin/users/data-table/UserRoleDropdown.vue";
import DeleteUserModal from "~/components/admin/users/data-table/DeleteUserModal.vue";
import { NuxtImg } from "#components";

export const columns: ColumnDef<UserInfo>[] = [
  {
    accessorKey: "image",
    header: () => h("div", { class: "text-left" }, "Image"),
    cell: ({ row }) => {
      return h(
        NuxtImg,
        { class: "rounded-full w-10 h-10", src: row.getValue("image") },
        row.getValue("image"),
      );
    },
  },
  {
    accessorFn: (row) => row.firstName + " " + row.lastName,
    id: "fullname",
    header: () => h("div", { class: "text-center" }, "Full Name"),
    cell: ({ row }) => {
      return h(
        "div",
        { class: "text-center" },
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
    cell: ({ row }) => {
      return h(DeleteUserModal, {
        id: row.original.id,
        open: row.original.open,
        "onUpdate:open": (open: boolean) => {
          row.original.open = open;
        },
      });
    },
  },
];
