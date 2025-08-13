"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginModal({ onClose }) {
  const [rememberMe, setRememberMe] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const router = useRouter();

  const validate = () => {
    let valid = true;
    let newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid.";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required.";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
       router.push('/');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(82,93,101,0.6)]">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold text-center mb-1">
          Welcome back to <span className="text-[#115D8E] font-bold">Deenita India</span>
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Your data stays protected while you stay connected.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative w-full">
            <label
              htmlFor="email"
              className="absolute font-semibold left-4 top-2 text-sm text-[#115D8E] pointer-events-none"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@company.com"
              className="w-full pt-6 pb-2 px-4 border-2 border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:ring-3 focus:ring-[#115D8E] focus:shadow-[0_4px_30px_rgba(138,173,187)]"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="relative w-full">
            <label
              htmlFor="password"
              className="absolute left-4 top-2 text-sm font-semibold text-[#115D8E] pointer-events-none"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="*************"
              className="w-full pt-6 pb-2 px-4 text-gray-900 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-[#115D8E]  focus:shadow-[0_0_6px_2px_rgba(17,93,142,0.4)]"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <Link href="/" className="text-[#115D8E] text-sm font-semibold hover:underline">
            Forget password?
          </Link>

          <div className="flex justify-between gap-2 mt-1">
            <span className="text-gray-700 text-sm">Remember sign in details</span>
            <button
              type="button"
              onClick={() => setRememberMe(!rememberMe)}
              className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors duration-300 ${rememberMe ? 'bg-[#115D8E]' : 'bg-gray-300'}`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${rememberMe ? 'translate-x-5' : 'translate-x-0'}`}
              />
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-4xl text-white font-semibold bg-gradient-to-r from-[#777777] to-[#115D8E] hover:opacity-90 transition"
          >
            Log in
          </button>
        </form>

        <div className="my-4 flex items-center justify-center">
          <div className="border-t w-1/3 border-gray-300" />
          <span className="px-2 text-sm text-gray-400">OR</span>
          <div className="border-t w-1/3 border-gray-300" />
        </div>

        <button className="w-full py-2 rounded-lg bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition">
          Continue with Google
        </button>

        <p className="text-center text-sm mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link href="#" className="text-[#115D8E] font-semibold hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
