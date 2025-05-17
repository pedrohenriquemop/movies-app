"use client";

import { Home, List, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

const routes = [
  {
    name: "Home",
    href: "/",
    icon: <Home />,
  },
  {
    name: "Lists",
    href: "/lists",
    icon: <List />,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: <User />,
  },
];

const AppSidebar = () => {
  const pathname = usePathname();

  // throw new Error("Test error");

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <SidebarMenu>
          {routes.map((route, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton asChild>
                <Link
                  href={route.href}
                  className={pathname === route.href ? "underline" : ""}
                >
                  {route.icon} {route.name}
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
