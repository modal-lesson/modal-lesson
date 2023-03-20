import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { Button } from "./ui/Button";

// import { CaretDownIcon } from "@radix-ui/react-icons";

export function Nav() {
  return (
    <NavigationMenu.Root className="flex justify-between p-6">
      <Link className="font-bold" href="/">
        MODAL LESSON
      </Link>
      <NavigationMenu.List className="flex">
        <NavigationMenu.Item>
          <Link href="/">Home</Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <Link className="hover:bg-violet3" href="/">
            About
          </Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <Link
            className="bg-neutral hover:bg-[#222222] text-white p-2 rounded-lg"
            href="/"
          >
            Login
          </Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
