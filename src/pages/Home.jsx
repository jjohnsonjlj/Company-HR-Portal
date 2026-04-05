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
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-7 py-3 rounded-xl hover:opacity-90 transition shadow-lg">
          Get Started
        </button>

        <button className="bg-white border border-gray-300 px-7 py-3 rounded-xl hover:bg-gray-100 transition">
          Learn More
        </button>
      </div>

    </div>
  );
}