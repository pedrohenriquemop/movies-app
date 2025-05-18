"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  BadgeCheck,
  ChevronsUpDown,
  Clapperboard,
  Coffee,
  Cog,
  Film,
  Home,
  List,
  LogOut,
  Logs,
  LucideIcon,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";
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
import UserCard from "./user-card";

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

  const user = {
    name: "John Doe",
    email: "johndoe@doe.com",
    avatar:
      "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/6e61b/MainBefore.avif",
  };

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
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <UserCard user={user} />
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserCard user={user} />
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Coffee />
                    Buy us a coffee
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BadgeCheck />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Cog />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Logs />
                    Logs
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
