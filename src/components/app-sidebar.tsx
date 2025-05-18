"use client";

import { Clapperboard, Film, Home, List, LucideIcon, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { Separator } from "./ui/separator";

const routes: {
  name: string;
  href: string;
  icon: LucideIcon;
}[] = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Movies",
    href: "/movies",
    icon: Film,
  },
  {
    name: "Lists",
    href: "/lists",
    icon: List,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
];

const AppSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="hover:none data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Clapperboard className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">SceneIt</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarMenu>
          {routes.map((route, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton
                asChild
                isActive={pathname === route.href}
                tooltip={route.name}
              >
                <Link href={route.href}>
                  <route.icon /> <span>{route.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
