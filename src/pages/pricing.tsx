import { env } from "~/env.mjs";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { type Url } from "next/dist/shared/lib/router/router";
import { useEffect } from "react";
import { PriceCard } from "~/components/PriceCard";
import { Tabs } from "~/components/Tabs";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const PREMIUM_PLAN = "Premium";
const ULTIMATE_PLAN = "Ultimate";

export default function Page() {
  const router = useRouter();

  const priceQuery = api.product.price.useQuery();
  const checkoutMutation = api.stripe.checkout.useMutation({
    onSuccess: async (data) => {
      await router.push(data as Url);
    },
  });

  const loading = checkoutMutation.isLoading || priceQuery.isLoading;
  const error = checkoutMutation.error || priceQuery.isError;

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

  function handleCheckout(plan: string) {
    checkoutMutation.mutate({
      price: plan,
    });
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error. </div>;
  }

  return (
    <div className="flex-grow p-10">
      <h1 className="text-4xl text-center font-bold my-10">
        Choose your right plan
      </h1>
      <Tabs />
      <PriceCard />
      <button onClick={() => handleCheckout(premiumPlan?.id as string)}>
        Premium Plan
      </button>
      <button onClick={() => handleCheckout(ultimatePlan?.id as string)}>
        Ultimate Plan
      </button>
    </div>
  );
}
