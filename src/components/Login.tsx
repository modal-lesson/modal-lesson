// import { signIn } from "next-auth/react";
// import { Paper, Button, rem, Title, Text, Flex, Loader } from "@mantine/core";
// import { IconBrandGoogle } from "@tabler/icons-react";
// import { useState } from "react";

// export function Login() {
//   const [isLoading, setIsLoading] = useState(false);
//   async function handleLogin() {
//     setIsLoading(true);
//     try {
//       await signIn("google", { callbackUrl: "/home" });
//     } catch (error) {
//       console.log("Something went wrong: ", { catch: error });
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <Paper className="max-w-xl" shadow="xs" p="xl" withBorder>
//       <Flex
//         className="gap-5"
//         justify="center"
//         align="center"
//         direction="column"
//       >
//         <Title className="text-center" order={2}>
//           Welcome back to Modal Lesson!
//         </Title>
//         <Text>Sign in to get started.</Text>
//         <Button
//           disabled={isLoading}
//           className="!bg-primary hover:!bg-primary-hover"
//           component="a"
//           rel="noopener noreferrer"
//           leftIcon={isLoading ? null : <IconBrandGoogle size={rem(18)} />}
//           onClick={() => void handleLogin()}
//         >
//           {isLoading ? (
//             <Loader className="w-[190px]" size="xs" color="green" />
//           ) : (
//             "Sign in with Google"
//           )}
//         </Button>
//       </Flex>
//     </Paper>
//   );
// }
