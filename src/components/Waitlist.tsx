export function Waitlist() {
  return (
    <section className="mb-10 p-10 bg-base-300 rounded-lg my-0 mx-auto w-96">
      <h2 className="text-3xl font-bold mb-5">Sign up for our waitlist!</h2>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-primary w-full max-w-xs mb-5"
      />
      <button className="btn btn-primary">Sign up</button>
    </section>
  );
}
