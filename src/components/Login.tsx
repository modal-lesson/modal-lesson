import { signIn } from "next-auth/react";
import { Paper, Button, rem, Title, Text, Flex } from "@mantine/core";
import { IconBrandGoogle } from "@tabler/icons-react";

export function Login() {
  async function handleLogin() {
    try {
      await signIn("google", { callbackUrl: "/home" });
    } catch (error) {
      console.log("Something went wrong: ", { catch: error });
    }
  }

  return (
    <Paper className="max-w-xl" shadow="xs" p="xl" withBorder>
      <Flex
        className="gap-5"
        justify="center"
        align="center"
        direction="column"
      >
        <Title className="text-center" order={2}>
          Welcome back to Modal Lesson!
        </Title>
        <Text>Sign in to get started.</Text>
        <Button
          className="!bg-primary hover:!bg-primary-hover"
          component="a"
          rel="noopener noreferrer"
          leftIcon={<IconBrandGoogle size={rem(18)} />}
          onClick={() => void handleLogin()}
        >
          Sign in with Google
        </Button>
      </Flex>
    </Paper>
  );
}
