import { z } from "zod";
import { env } from "~/env.mjs";
import { stripe } from "~/server/api/client";

import {
  createTRPCRouter,
  publicProcedure,
  //   protectedProcedure,
} from "~/server/api/trpc";

export const stripeRouter = createTRPCRouter({
  checkout: publicProcedure
    .input(z.object({ price: z.string() }))
    .mutation(async ({ input }) => {
      const { price } = input;

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price,
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${env.BASE_URL}/?success=true"`,
        cancel_url: `${env.BASE_URL}?canceled=true"`,
      });
      return session.url;
    }),
});
