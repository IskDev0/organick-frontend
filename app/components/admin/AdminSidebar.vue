<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { ChevronDown } from "lucide-vue-next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

interface SidebarItem {
  title: string;
  url: string;
  icon: string;
}

const menuItems: SidebarItem[] = [
  { title: "Dashboard", url: "/admin", icon: "lucide:chart-area" },
  { title: "Products", url: "/admin/products", icon: "lucide:shopping-bag" },
  { title: "Orders", url: "/admin/orders", icon: "lucide:shopping-cart" },
  { title: "Users", url: "/admin/users", icon: "lucide:users" },
  { title: "News", url: "/admin/news", icon: "lucide:newspaper" },
  { title: "Newsletter", url: "/admin/newsletter", icon: "lucide:mailbox" },
  { title: "Applications", url: "/admin/applications", icon: "lucide:mail" },
];

const analyticsItems: SidebarItem[] = [
  {
    title: "By Customers",
    url: "/admin/analytics/customers",
    icon: "lucide:user",
  },
  {
    title: "By Orders",
    url: "/admin/analytics/orders",
    icon: "lucide:package",
  },
  {
    title: "By Products",
    url: "/admin/analytics/products",
    icon: "lucide:shopping-basket",
  },
];

const { logout } = useAuthStore();
</script>

<template>
  <Sidebar variant="inset" collapsible="icon">
    <SidebarHeader>
      <NuxtLink to="/">
        <NuxtImg src="/images/logo.svg" />
      </NuxtLink>
    </SidebarHeader>
    <SidebarContent>
      <SidebarMenu>
        <Collapsible class="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton>
                <div class="flex items-center gap-2">
                  <Icon name="lucide:chart-bar" />
                  <span>Analytics</span>
                </div>
                <ChevronDown
                  class="ml-auto h-4 w-4 shrink-0 opacity-50 group-open:rotate-180 transition duration-200" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem
                  v-for="item in analyticsItems"
                  :key="item.url">
                  <NuxtLink :to="item.url" class="flex items-center gap-2">
                    <Icon :name="item.icon" />
                    <span>{{ item.title }}</span>
                  </NuxtLink>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
        <SidebarMenuItem v-for="item in menuItems" :key="item.url">
          <SidebarMenuButton>
            <NuxtLink :to="item.url" class="flex items-center gap-2">
              <Icon :name="item.icon" />
              <span>{{ item.title }}</span>
            </NuxtLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <Icon name="lucide:user" />
                Username
                <Icon name="lucide:chevron-up" class="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              class="w-[--radix-popper-anchor-width]">
              <DropdownMenuItem>
                <NuxtLink to="/profile" class="flex items-center gap-2">
                  <Icon name="lucide:user" />
                  <span>Account</span>
                </NuxtLink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div @click="logout" class="flex items-center gap-2">
                  <Icon name="lucide:log-out" />
                  <span>Sign out</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>
