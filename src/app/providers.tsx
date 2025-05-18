import { BreadcrumbProvider } from "@/components/contexts/breadcrumb-context";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <BreadcrumbProvider>
        <ThemeProvider attribute={"class"} enableSystem>
          {children}
        </ThemeProvider>
      </BreadcrumbProvider>
    </SidebarProvider>
  );
};

export default Providers;
