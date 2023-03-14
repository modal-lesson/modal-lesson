export function Hero() {
  return (
    <section className="flex my-36 gap-10 justify-around">
      <div className="w-96">
        <h1 className="text-5xl font-bold mb-10">Welcome to Modal Lesson!</h1>
        <p className="mb-10">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
          id nisi.
        </p>
        <button className="btn btn-primary">get started</button>
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
