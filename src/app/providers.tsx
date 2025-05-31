import { AuthProvider } from "@/components/contexts/auth-context";
import { BreadcrumbProvider } from "@/components/contexts/breadcrumb-context";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <BreadcrumbProvider>
        <AuthProvider>
          <ThemeProvider attribute={"class"} enableSystem>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </BreadcrumbProvider>
    </SidebarProvider>
  );
};

export default Providers;
