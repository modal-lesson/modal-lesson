import { signIn } from "next-auth/react";
import { Paper, Button, rem, Title, Flex } from "@mantine/core";
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
    <Paper display="flex" shadow="xs" p="md" withBorder>
      <Flex justify="center" align="center" direction="column">
        <Title order={1}>Welcome back to Modal Lesson!</Title>
        <Button
          className="!bg-primary"
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
