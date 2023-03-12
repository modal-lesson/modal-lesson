import { createEmotionCache } from "@mantine/core";
/**
 * This is the cache used for the server-side rendering.
 * Needed to work with tailwindcss
 */
export const rtlCache = createEmotionCache({
  key: "mantine-rtl",
});
