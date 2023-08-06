// import {
//   Switch,
//   Group,
//   useMantineColorScheme,
//   useMantineTheme,
//   createStyles,
// } from "@mantine/core";
// import { IconSun, IconMoonStars } from "@tabler/icons-react";

// const useStyles = createStyles((theme) => ({
//   hiddenMobile: {
//     [theme.fn.smallerThan("sm")]: {
//       display: "none",
//     },
//   },
// }));

// export function SwitchToggle() {
//   const scheme = useMantineColorScheme();
//   const theme = useMantineTheme();
//   const { classes } = useStyles();

//   return (
//     <Group className={classes.hiddenMobile} position="center">
//       <Switch
//         color={theme.black}
//         checked={scheme.colorScheme === "dark"}
//         onChange={() => scheme.toggleColorScheme()}
//         size="md"
//         onLabel={
//           <IconSun
//             className="!checked:bg-primary"
//             color={theme.white}
//             size="1.25rem"
//             stroke={1.5}
//           />
//         }
//         offLabel={
//           <IconMoonStars
//             color={theme.colors.gray[6]}
//             size="1.25rem"
//             stroke={1.5}
//           />
//         }
//       />
//     </Group>
//   );
// }
