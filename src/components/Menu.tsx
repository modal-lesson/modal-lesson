import { Menu, Text } from "@mantine/core";
import {
  IconSettings,
  IconSearch,
  IconMessageCircle,
  IconChevronRight,
} from "@tabler/icons-react";
import { type Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";

type MenuNavProps = {
  icon?: React.ReactNode;
  session?: Session;
};

export function MenuNav({ icon }: MenuNavProps) {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        {icon || (
          <IconChevronRight
            className="cursor-pointer h-full pr-3"
            size="1.8rem"
            stroke={1.5}
          />
        )}
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item icon={<IconSettings size={14} />}>
          <Link href="/settings">Settings</Link>
        </Menu.Item>
        <Menu.Item icon={<IconMessageCircle size={14} />}>
          <Link href="/profile">Profile</Link>
        </Menu.Item>
        <Menu.Item
          icon={<IconSearch size={14} />}
          rightSection={
            <Text size="xs" color="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>
        <Menu.Item
          icon={<IconMessageCircle size={14} />}
          onClick={() => void signOut({ callbackUrl: "/" })}
        >
          Sign out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
