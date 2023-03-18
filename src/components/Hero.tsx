import { Button } from "./ui/Button";

export function Hero() {
  return (
    <section className="my-36 flex justify-around gap-10">
      <div className="relative w-[450px]">
        {/* <div className="absolute right-auto bottom-auto left-[-40px] top-[-42px] -z-10 h-56 w-56 bg-gradient-to-tr from-lime-500 via-cyan-600 to-red-600 blur-[120px]"></div> */}
        <h1 className="font-heading mb-10 text-6xl font-bold">
          Welcome to{" "}
          <span className="text-6xl font-heading font-bold text-primary">
            Modal Lesson!
          </span>
        </h1>
        <p className="mb-10 text-xl">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
          id nisi.
        </p>
        <Button>get started</Button>
      </div>
      <div>
        <img
          className="max-w-sm rounded-lg shadow-2xl"
          src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
          alt="hero image"
        />
      </div>
    </section>
  );
}
