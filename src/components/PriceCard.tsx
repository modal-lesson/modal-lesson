export function PriceCard() {
  return (
    <div className="flex gap-4 justify-center">
      {PRICE_DETAILS.map((price) => (
        <div key={price.title} className="card w-96 bg-base-300 shadow-xl">
          <div className="card-body">
            <div className="flex items-center">
              <h2 className="card-title">{price.title}</h2>
              <div className="badge badge-accent ml-2">accent</div>
            </div>

            {price.features.map((feature) => (
              <div key={feature.name} className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="ml-2">{feature.name}</span>
              </div>
            ))}

            <div
              className={`${
                price.price === "FREE" ? "text-2xl font-bold" : "stat-value"
              }`}
            >
              {price.price}
              <span className="text-base font-normal">
                {price.price === "FREE" ? "" : "/month"}
              </span>
            </div>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">{price.buttonText}</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const PRICE_DETAILS = [
  {
    title: "Free",
    price: "FREE",
    features: [
      {
        name: "Feature #1",
      },
      {
        name: "Feature #2",
      },
      {
        name: "Feature #3",
      },
    ],
    buttonText: "Free",
  },
  {
    title: "Basic",
    price: "$3.99",
    features: [
      {
        name: "Feature #1",
      },
      {
        name: "Feature #2",
      },
      {
        name: "Feature #3",
      },
    ],
    buttonText: "Free",
  },
  {
    title: "Premium",
    price: "$7.99",
    features: [
      {
        name: "Feature #1 A",
      },
      {
        name: "Feature #2 B",
      },
      {
        name: "Feature #3 C",
      },
    ],
    buttonText: "Subscribe",
  },
];
