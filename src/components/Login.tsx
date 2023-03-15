import { signIn } from "next-auth/react";

export function Login() {
  const handleLogin = async () => {
    try {
      await signIn("google", { callbackUrl: "/home" });
    } catch (error) {
      console.log("Something went wrong: ", { catch: error });
    }
  };

  return (
    <>
      <label htmlFor="my-modal" className="btn">
        Login
      </label>

      <div>
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <label htmlFor="my-modal" className="modal cursor-pointer">
          <label
            className="modal-box relative flex max-w-[330px] flex-col items-center justify-center"
            htmlFor=""
          >
            <h3 className="text-lg font-bold uppercase tracking-[0.15rem] text-primary">
              MODAL LESSON
            </h3>
            <p className="py-4 font-bold">Create an account or sign in</p>
            <button
              className="btn w-64 tracking-wider font-bold"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={handleLogin}
            >
              <img
                className="mr-2"
                src="/google-icon.svg"
                width={20}
                height={20}
                alt="Google icon"
              />
              Sign in with google
            </button>

            <div className="flex w-64 flex-col items-center justify-center">
              <p className="py-4">Or continue with email</p>
              <input
                type="email"
                placeholder="Email address"
                className="input-bordered input input-primary w-full max-w-xs"
              />
              <button className="btn-primary btn my-4 w-full">Continue</button>
            </div>
          </label>
        </label>
      </div>
    </>
  );
}
