"use client";

import { useAuth } from "@/components/contexts/auth-context";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  ChevronsUpDown,
  Clapperboard,
  Film,
  Home,
  LogOut,
  LucideIcon,
  User,
  User2Icon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AuthModal from "./auth-modal";
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
  authRequired?: boolean;
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
    name: "Profile",
    href: "/profile",
    icon: User,
    authRequired: true,
  },
];

const AppSidebar = () => {
  const pathname = usePathname();
  const { state } = useSidebar();
  const { isLoggedIn, user, logout } = useAuth();

  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
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
            {routes.map((route, index) => {
              const isDisabled = route.authRequired && !isLoggedIn;
              const linkProps = isDisabled
                ? {
                    onClick: (e: React.MouseEvent) => {
                      e.preventDefault();
                      if (!isLoggedIn) setShowAuthModal(true);
                    },
                    "aria-disabled": true,
                    title: "Login to access this feature",
                    href: "",
                  }
                : { href: route.href };

              return (
                <SidebarMenuItem
                  key={index}
                  className={`${state === "collapsed" ? "px-2" : "px-1"} transition-[padding] duration-100`}
                  data-testid={`${route.name.toLowerCase()}-sidebar-item`}
                >
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === route.href && !isDisabled}
                    tooltip={route.name}
                    disabled={isDisabled}
                    size="lg"
                  >
                    <Link {...linkProps}>
                      <div className="flex aspect-square items-center justify-center rounded-lg p-2">
                        <route.icon className="size-4" />
                      </div>
                      <span>{route.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              {isLoggedIn && user ? (
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
                      <DropdownMenuItem asChild>
                        <Link href="/profile">
                          <User2Icon /> <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <SidebarMenuButton
                  size="lg"
                  onClick={() => setShowAuthModal(true)}
                  data-testid="login-register-button"
                >
                  <div className="flex aspect-square items-center justify-center rounded-lg p-2">
                    <User className="size-4" />
                  </div>
                  <span>Login / Register</span>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default AppSidebar;
