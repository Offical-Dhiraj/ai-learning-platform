export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-3 gap-8">

          <div>
            <h2 className="text-3xl font-bold">
              Edu<span className="text-blue-400">AI</span>
            </h2>

            <p className="text-gray-400 mt-3">
              AI-powered learning platform for smarter preparation.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-3">
              Quick Links
            </h3>

            <ul className="space-y-2 text-gray-400">
              <li>Home</li>
              <li>Dashboard</li>
              <li>Study Plan</li>
              <li>Results</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-3">
              Contact
            </h3>

            <p className="text-gray-400">
              support@eduai.com
            </p>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500">
          © 2026 EduAI. All Rights Reserved.
        </div>

      </div>

    </footer>
  );
}