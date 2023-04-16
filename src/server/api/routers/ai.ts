import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { env } from "~/env.mjs";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const aiRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        students: z.string(),
        grade: z.string(),
        subject: z.string(),
        length: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const response = await fetch(`${env.API_URL}/generate-lesson`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        });

        if (!response.ok) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong",
          });
        }

        const body = (await response.json()) as { attributes: string[] };

        return body.attributes;
      } catch (error) {
        console.log("Something went wrong: ", { catch: error });
      }
    }),
});
