import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Login } from "./Login";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="navbar bg-transparent">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn-ghost btn lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <Link href="/pricing">Pricing</Link>
            </li>

            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <Link href="/" className="btn-ghost btn text-xl normal-case">
          MODAL LESSON
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        {session
          ? SIGNED_IN_NAV.map((item) => (
              <ul key={item.label} className="menu menu-horizontal px-1">
                <li>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              </ul>
            ))
          : NOT_SIGNED_IN_NAV.map((item) => (
              <ul key={item.label} className="menu menu-horizontal px-1">
                <li>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              </ul>
            ))}
      </div>

      <div className="navbar-end">
        {session ? (
          <button
            className="btn"
            onClick={() => void signOut({ callbackUrl: "/" })}
          >
            Sign out
          </button>
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
}

const NOT_SIGNED_IN_NAV = [
  {
    href: "/pricing",
    label: "Pricing",
  },
  {
    href: "/contact",
    label: "Contact",
  },
];

const SIGNED_IN_NAV = [
  {
    href: "/dashboard",
    label: "Dashboard",
  },
  {
    href: "/planbook",
    label: "Planbook",
  },
  {
    href: "/my-lessons",
    label: "My Lessons",
  },
  {
    href: "/settings",
    label: "Settings",
  },
];
