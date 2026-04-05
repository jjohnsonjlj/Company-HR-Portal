import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative text-center py-28 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-purple-50 blur-2xl opacity-60" />

      <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6 leading-tight dark:text-gray-300">
        HR Management
        <span className="block bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          Made Simple
        </span>
      </h1>

      <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-10">
        Streamline employees, approvals, and onboarding — all in one powerful platform built for modern teams.
      </p>

      <div className="flex justify-center gap-4">
        <Link
          to="/register"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-7 py-3 rounded-xl hover:opacity-90 transition shadow-lg">
          Get Started
        </Link>

        <Link
          to="/about"
          className="bg-gray-200 text-gray-800 px-7 py-3 rounded-xl hover:bg-gray-300 transition shadow-lg dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}