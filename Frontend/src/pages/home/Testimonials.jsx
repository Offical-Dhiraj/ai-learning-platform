export default function Testimonials() {
  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Placement Student",
      review:
        "The AI-generated tests helped me identify my weak topics and improve quickly."
    },
    {
      name: "Priya Verma",
      role: "JEE Aspirant",
      review:
        "The personalized study plan saved me countless hours of planning."
    },
    {
      name: "Aman Singh",
      role: "Software Engineer",
      review:
        "The dashboard and analytics are amazing. It feels like having a personal mentor."
    }
  ];

  return (
    <section className="py-24 bg-slate-900 text-white">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center mb-16">
          What Students Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-slate-800 p-8 rounded-2xl"
            >
              <p className="text-gray-300 mb-6">
                "{item.review}"
              </p>

              <h4 className="font-bold text-blue-400">
                {item.name}
              </h4>

              <p className="text-gray-500">
                {item.role}
              </p>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}