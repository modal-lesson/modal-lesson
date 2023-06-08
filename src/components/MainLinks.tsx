import React from "react";
import {
  IconHome,
  IconCalendar,
  IconNotebook,
  IconSettings,
  IconRobot,
} from "@tabler/icons-react";
import { ThemeIcon, UnstyledButton, Group, Text } from "@mantine/core";

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  href: string;
}

function MainLink({ icon, color, label, href }: MainLinkProps) {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text component="a" href={href} size="sm" className="!w-[150px]">
          {label}
        </Text>
      </Group>
    </UnstyledButton>
  );
}

const data = [
  {
    icon: <IconHome size="1rem" />,
    color: "blue",
    label: "Home",
    href: "/home",
  },
  {
    icon: <IconCalendar size="1rem" />,
    color: "teal",
    label: "Calendar",
    href: "/calendar",
  },
  {
    icon: <IconRobot size="1rem" />,
    color: "yellow",
    label: "Lesson AI",
    href: "/lesson-ai",
  },
  {
    icon: <IconNotebook size="1rem" />,
    color: "violet",
    label: "My Classes",
    href: "/classes",
  },
  {
    icon: <IconSettings size="1rem" />,
    color: "grape",
    label: "Settings",
    href: "/settings",
  },
];

export function MainLinks() {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}
