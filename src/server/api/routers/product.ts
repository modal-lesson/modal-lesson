import { z } from "zod";
import { stripe } from "~/server/api/client";
import {
  createTRPCRouter,
  publicProcedure,
  //   protectedProcedure,
} from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  price: publicProcedure.query(async () => {
    const prices = await stripe.prices.list({
      limit: 3,
    });
    return {
      prices: prices.data,
    };
  }),
});
