export default function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
          About HR Portal
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          A modern HR management system designed to streamline employee operations.
        </p>
      </div>

      {/* Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-2">What This App Does</h2>
        <p className="text-gray-600 dark:text-gray-400">
          HR Portal helps organizations manage employees, track requests, handle onboarding,
          and centralize HR workflows in one place.
        </p>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          "Employee Management",
          "Role-Based Access",
          "Request Tracking",
        ].map((feature, i) => (
          <div
            key={i}
            className="p-5 rounded-xl bg-white dark:bg-gray-800 shadow border border-gray-200 dark:border-gray-700"
          >
            <h3 className="font-medium">{feature}</h3>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Built as a full-stack HR solution using React + Tailwind + JSON Server.
      </div>

    </div>
  );
}