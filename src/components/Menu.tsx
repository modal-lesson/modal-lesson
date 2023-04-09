import { Menu, Text } from "@mantine/core";
import {
  IconSettings,
  IconSearch,
  IconMessageCircle,
  IconChevronRight,
} from "@tabler/icons-react";
import { type Session } from "next-auth";

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
        <Menu.Item
          component="a"
          href="/settings"
          icon={<IconSettings size={14} />}
        >
          Settings
        </Menu.Item>
        <Menu.Item
          component="a"
          href="/profile"
          icon={<IconMessageCircle size={14} />}
        >
          Profile
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
      </Menu.Dropdown>
    </Menu>
  );
}
