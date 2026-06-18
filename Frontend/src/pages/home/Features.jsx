export default function Features() {
  const features = [
    {
      icon: "🧠",
      title: "AI Test Generation",
      desc: "Generate unique exam-specific tests instantly."
    },
    {
      icon: "📊",
      title: "Performance Analytics",
      desc: "Track scores and weak topics."
    },
    {
      icon: "🎯",
      title: "Study Plans",
      desc: "Personalized learning roadmap."
    },
    {
      icon: "📚",
      title: "Resources",
      desc: "Videos and notes for every topic."
    }
  ];

  return (
    <section className="py-24 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center mb-16">
          Features
        </h2>

        <div className="grid md:grid-cols-4 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-900 p-6 rounded-2xl"
            >
              <div className="text-5xl mb-4">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-400">
                {feature.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}