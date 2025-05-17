import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "next-themes";
import React, { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <ThemeProvider attribute={"class"} enableSystem>
        {children}
      </ThemeProvider>
    </SidebarProvider>
  );
};

export default Providers;
