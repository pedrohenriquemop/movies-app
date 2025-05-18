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
  useSidebar,
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

  const { state } = useSidebar();

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
      <SidebarContent className="gap-2">
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarMenu className="gap-1">
          {routes.map((route, index) => (
            <SidebarMenuItem
              key={index}
              className={`${state === "collapsed" ? "px-2" : "px-1"} transition-[padding] duration-100`}
            >
              <SidebarMenuButton
                asChild
                isActive={pathname === route.href}
                tooltip={route.name}
                size="lg"
              >
                <Link href={route.href}>
                  <div className="flex aspect-square items-center justify-center rounded-lg p-2">
                    <route.icon className="size-4" />
                  </div>
                  <span>{route.name}</span>
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
