import {h} from 'vue'
import type {ColumnDef} from "@tanstack/vue-table";
import {ArrowUpDown} from 'lucide-vue-next'
import {Button} from "@/components/ui/button";
import {Icon} from "#components";
import type { IProduct } from "~/types/IProduct";
import DropdownAction from "~/components/admin/products/data-table/DropdownAction.vue";

export const columns: ColumnDef<IProduct>[] = [
  {
    id: "index",
    header: () => h('div', '№'),
    cell: ({row}) => {
      return h('div', {class: 'font-medium'}, row.index + 1)
    }
  },
  {
    accessorKey: 'image',
    header: () => h('div',  'Image'),
    cell: ({row}) => {
      return h('img', {
        class: 'font-medium h-20 w-20',
        src: row.getValue('image')
      }, row.getValue('image'))
    },
  },
  {
    accessorKey: "name",
    header: ({column}) => {
      return h(Button, {
        class: 'flex items-center gap-2 font-normal text-md',
        variant: 'ghost',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      }, () => ['Name', h(ArrowUpDown, {class: 'h-4 w-4'})])
    },
    cell: ({row}) => {
      return h(
        "div",
        {class: " font-medium"},
        row.getValue("name")
      );
    }
  },
  {
    accessorKey: "price",
    header: ({column}) => {
      return h(Button, {
        variant: 'ghost',
        class: 'flex items-center w-full gap-2 font-normal text-md',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      }, () => ['Price', h(ArrowUpDown, {class: 'h-4 w-4'})])
    },
    cell: ({row}) => {
      const price = Number.parseFloat(row.getValue('price'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price)
      return h(
        "div",
        {class: "text-center font-medium"},
        formatted
      );
    }
  },
  {
    accessorKey: "category",
    header: ({column}) => {
      return h(Button, {
        variant: 'ghost',
        class: 'flex items-center w-full gap-2 font-normal text-md',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      }, () => ['Category', h(ArrowUpDown, {class: 'h-4 w-4'})])
    },
    cell: ({row}) => {
      return h(
        "div",
        {class: "text-center font-medium"},
        row.getValue("category")
      );
    }
  },
  {
    accessorKey: "rating",
    header: ({column}) => {
      return h(Button, {
        variant: 'ghost',
        class: 'flex items-center w-full font-normal text-md',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      }, () => ['Rating', h(ArrowUpDown, {class: 'ml-2 h-4 w-4'})])
    },
    cell: ({ row }) => {
      return h(
        "div",
        { class: "flex items-center justify-center gap-2 font-medium" },
        [
          h("span", row.getValue("rating")),
          h(Icon, { name: 'i-mynaui:star-solid', class: 'h-4 w-4 text-yellow-500' })
        ]
      );
    }
  },
  {
    id: "actions",
    header: () => h('div', ""),
    cell: ({ row }) => {
      return h('div', { class: 'flex gap-2 justify-end' },
        h(DropdownAction, { product: row.original }))
    }
  }
]