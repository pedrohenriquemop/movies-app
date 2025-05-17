import ThemeToggle from "./ThemeToggle";
import { SidebarTrigger } from "./ui/sidebar";

const Header = () => {
  console.log("header");

  return (
    <header className="flex h-16 w-full items-center justify-between rounded-3xl border p-1 px-10">
      <SidebarTrigger />
      <h1 className="text-3xl">Header</h1>
      <ThemeToggle />
    </header>
  );
};

export default Header;
