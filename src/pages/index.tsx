import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { loadStripe } from "@stripe/stripe-js";
import { env } from "~/env.mjs";
import { useEffect } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { type Url } from "next/dist/shared/lib/router/router";

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const PREMIUM_PLAN = "Premium";
const ULTIMATE_PLAN = "Ultimate";

const Home: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const priceQuery = api.product.price.useQuery();
  const checkoutMutation = api.stripe.checkout.useMutation({
    onSuccess: async (data) => {
      await router.push(data as Url);
    },
  });

  const loading = checkoutMutation.isLoading || priceQuery.isLoading;
  const error = checkoutMutation.error || priceQuery.isError;

  // console.logpriceQuery.data?.prices;

  const premiumPlan = priceQuery.data?.prices.find(
    (price) => price.nickname === PREMIUM_PLAN
  );
  const ultimatePlan = priceQuery.data?.prices.find(
    (price) => price.nickname === ULTIMATE_PLAN
  );

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  function handleCheckout() {
    checkoutMutation.mutate({
      price: premiumPlan?.id as string,
    });
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error..</div>;
  }

  return (
    <>
      <Head>
        <title>Modal Lesson</title>
        <meta name="description" content="Create lesson plans for teachers!" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Head>
      <main>
        <h1>Welcome to Modal Lesson</h1>
        <button onClick={() => void signIn()}>asdf</button>
        <button onClick={handleCheckout}>CHECKOUT</button>
      </main>
    </>
  );
};

export default Home;
