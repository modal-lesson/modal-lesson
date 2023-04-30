import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { stripeRouter } from "./routers/stripe";
import { productRouter } from "./routers/product";
import { lessonPlanRouter } from "./routers/lessonPlan";
import { userRouter } from "./routers/user";
import { aiRouter } from "./routers/ai";
import { classRouter } from "./routers/class";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  example: exampleRouter,
  stripe: stripeRouter,
  product: productRouter,
  ai: aiRouter,
  lessonPlan: lessonPlanRouter,
  class: classRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
