import { useEffect, useState } from "react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const heroTexts = [
    {
      title: "Celebrating Excellence",
      subtitle: "Honoring a visionary dedicated to building a sustainable and prosperous Nigeria",
      description: "Today we celebrate not just another year, but a lifetime of dedication, vision, and unwavering commitment to our nation's future."
    },
    {
      title: "A Life of Purpose",
      subtitle: "Championing progress through sustainable development and national transformation",
      description: "Every milestone achieved reflects a steadfast commitment to creating lasting change and empowering communities across Nigeria."
    },
    {
      title: "Visionary Leadership",
      subtitle: "Building bridges toward a brighter, more sustainable future for all Nigerians",
      description: "Through innovation, integrity, and unwavering dedication, remarkable achievements continue to inspire generations."
    },
    {
      title: "Legacy of Impact",
      subtitle: "Transforming challenges into opportunities for sustainable growth and prosperity",
      description: "A testament to the power of vision, determination, and the relentless pursuit of excellence in nation-building."
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % heroTexts.length);
    }, 6000); // Change text every 6 seconds

    return () => clearInterval(interval);
  }, [heroTexts.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-emerald/20 blur-3xl animate-gentle-float" />
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-gold/20 blur-3xl animate-gentle-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-gentle-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main Content */}
      <div className={`text-center px-6 max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="transition-all duration-1000 ease-in-out opacity-100 translate-x-0 inset-0" >
          <p className="text-xl md:text-2xl text-gold mb-8 font-light max-w-2xl mx-auto leading-relaxed">
            Celebrating <span className="text-lg text-text-gradient-celebration/70 max-w-xl mx-auto">
            A Father, Mentor, Leader, Visionary
          </span>
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient-celebration leading-tight">
            Dr. OJEHOMON ANETOR
          </h1>
        </div>

        <div className="relative overflow-hidden">
          {heroTexts.map((text, index) => (
            <div
              key={index}
              className={`transition-all duration-1800 ease-in-out ${index === currentTextIndex
                ? 'opacity-100 translate-x-0'
                : index < currentTextIndex
                  ? 'opacity-0 -translate-x-full absolute inset-0'
                  : 'opacity-0 translate-x-full absolute inset-0'
                }`}
            >
              <h1 className="text-3xl md:text-5xl  py-2 font-bold mb-6 text-gradient-celebration leading-tight">
                {text.title}
              </h1>

              <p className="text-xl md:text-2xl text-gold mb-8 font-light max-w-2xl mx-auto leading-relaxed">
                {text.subtitle}
              </p>

              <div className="w-24 h-1 bg-gradient-to-r from-emerald to-gold mx-auto mb-12 rounded-full" />

              <p className="text-lg text-celebration-white/80 max-w-xl mx-auto">
                {text.description}
              </p>
            </div>
          ))}
        </div>
      </div>


      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gold/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gold rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;