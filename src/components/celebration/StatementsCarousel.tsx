import { useEffect, useState } from "react";

const statements = [
  "Leadership is not about being in charge. It is about taking care of those in your charge.",
  "The future belongs to nations that invest in their people, their environment, and their values.",
  "Sustainable development is not just an option; it is our responsibility to future generations.",
  "True progress is measured not by what we take from our land, but by what we leave for our children.",
  "Innovation without integrity is destruction. We must build with both vision and virtue.",
  "A nation's strength lies not in its resources, but in the character of its people.",
  "Every challenge is an opportunity to demonstrate our resilience and creativity.",
  "Education is the foundation upon which we build a sustainable future for Nigeria.",
  "Unity in diversity is our greatest asset in building a prosperous nation.",
  "The measure of our success will be the legacy we leave for the next generation."
];

const StatementsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % statements.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('statements-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="statements-section" className="py-24 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-emerald/5 blur-2xl" />
        <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-gold/5 blur-2xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient-gold mb-4">
            Words of Wisdom
          </h2>
          <p className="text-celebration-white/70 text-lg">
            Reflections on leadership, sustainability, and building a better Nigeria
          </p>
        </div>

        <div className="relative h-64 flex items-center justify-center">
          <div className="relative max-w-4xl mx-auto">
            {statements.map((statement, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${
                  index === currentIndex 
                    ? 'opacity-100 transform translate-x-0 scale-100' 
                    : index < currentIndex 
                      ? 'opacity-0 transform -translate-x-full scale-95' 
                      : 'opacity-0 transform translate-x-full scale-95'
                }`}
              >
                <blockquote className="text-xl md:text-3xl font-light text-center text-celebration-white leading-relaxed px-8">
                  "{statement}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center mt-12 space-x-2">
          {statements.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-gold scale-125' 
                  : 'bg-celebration-white/30 hover:bg-celebration-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatementsCarousel;