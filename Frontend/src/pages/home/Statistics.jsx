export default function Statistics() {
  const stats = [
    {
      value: "10K+",
      label: "Questions Generated"
    },
    {
      value: "500+",
      label: "Study Plans Created"
    },
    {
      value: "95%",
      label: "Success Rate"
    },
    {
      value: "24/7",
      label: "AI Assistance"
    }
  ];

  return (
    <section className="py-24 bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center mb-16">
          Trusted By Learners
        </h2>

        <div className="grid md:grid-cols-4 gap-8">

          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-slate-900 p-8 rounded-2xl text-center"
            >
              <h3 className="text-4xl font-bold text-blue-400">
                {stat.value}
              </h3>

              <p className="text-gray-400 mt-3">
                {stat.label}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}