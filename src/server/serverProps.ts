import { type GetServerSideProps } from "next/types";
import { getServerAuthSession } from "~/server/auth";

/**
 * This is resusable only to check authentication
 * If logic is different, do not use this
 */
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
