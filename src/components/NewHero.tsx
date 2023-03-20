import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  rem,
} from "@mantine/core";
import { SwitchToggle } from "./SwitchToggle";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: `calc(${theme.spacing.xl} * 4)`,
    paddingBottom: `calc(${theme.spacing.xl} * 4)`,
  },

  content: {
    maxWidth: rem(480),
    marginRight: `calc(${theme.spacing.xl} * 3)`,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily || ""}`,
    fontSize: rem(48),
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    borderRadius: theme.radius.sm,
    padding: `${rem(4)} ${rem(12)}`,
  },
}));

export function Hero() {
  const { classes } = useStyles();
  return (
    <div>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={`${classes.title} !font-heading`}>
              A{" "}
              <span className={`${classes.highlight} !bg-primary`}>modern</span>{" "}
              way <br /> to build your lesson plans!
            </Title>
            <Text color="dimmed" mt="md">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </Text>

            <Group mt={30}>
              <Button size="md" className={`${classes.control} !bg-primary`}>
                Get started
              </Button>
              <Button
                variant="default"
                size="md"
                className={`${classes.control} bg-neutral`}
              >
                Placeholder
              </Button>
            </Group>
          </div>
          <Image
            src="https://ui.mantine.dev/_next/static/media/image.9a65bd94.svg"
            className={classes.image}
          />
        </div>
      </Container>
    </div>
  );
}
