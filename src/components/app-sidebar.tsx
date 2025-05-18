"use client";

import { Film, Home, List, LucideIcon, User } from "lucide-react";
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
      <SidebarHeader />
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
