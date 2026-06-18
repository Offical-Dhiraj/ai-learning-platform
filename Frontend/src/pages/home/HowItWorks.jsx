export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Choose Your Exam",
      desc: "Select Placement, JEE, NEET or any exam category."
    },
    {
      number: "02",
      title: "Generate AI Test",
      desc: "AI creates a personalized test based on your exam."
    },
    {
      number: "03",
      title: "Analyze Performance",
      desc: "Identify strengths and weak topics instantly."
    },
    {
      number: "04",
      title: "Get Study Plan",
      desc: "Receive a personalized roadmap for improvement."
    }
  ];

  return (
    <section className="py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center mb-16">
          How It Works
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-slate-800 p-8 rounded-2xl text-center"
            >
              <h3 className="text-5xl font-bold text-blue-400 mb-4">
                {step.number}
              </h3>

              <h4 className="text-xl font-bold mb-3">
                {step.title}
              </h4>

              <p className="text-gray-400">
                {step.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}