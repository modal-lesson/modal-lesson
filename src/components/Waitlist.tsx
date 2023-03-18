export function Waitlist() {
  return (
    <section className="relative flex justify-between mb-10 p-10 bg-base-300 rounded-xl my-0 mx-auto max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold mb-5 w-[400px]">
          Be the first to know when Modal Lesson is available! Join our
          waitlist.
        </h2>
      </div>
      <div>
        <input
          type="text"
          placeholder="Email"
          className="input input-bordered input-primary w-full mb-5"
        />
        <button className="btn btn-primary w-full text-white">Sign up</button>
        {/* <div className="z-10 absolute right-auto left-[331px] bottom-[-33px] h-32 w-32 bg-gradient-to-tr from-lime-500 via-cyan-600 to-red-600 blur-[120px]"></div> */}
      </div>
    </section>
  );
}
