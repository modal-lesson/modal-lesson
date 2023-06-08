import React from "react";
import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  Box,
  useMantineTheme,
  rem,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import { MenuNav } from "./Menu";

export function User() {
  const { data: session } = useSession();
  const theme = useMantineTheme();
  const user = session?.user;
  const firstName = session?.user?.name?.split(" ")[0] ?? "";

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `${rem(1)} solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      }}
    >
      <UnstyledButton
        sx={{
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
        }}
      >
        <Group>
          <Avatar src={user?.image} radius="xl" />
          <Box sx={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              {firstName}
            </Text>
            <Text color="dimmed" size="xs">
              {user?.email}
            </Text>
          </Box>
          <MenuNav />
        </Group>
      </UnstyledButton>
    </Box>
  );
}
