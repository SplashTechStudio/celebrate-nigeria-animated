import { useEffect, useState } from "react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

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
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient-celebration leading-tight">
          Celebrating Excellence
        </h1>
        
        <p className="text-xl md:text-2xl text-gold mb-8 font-light max-w-2xl mx-auto leading-relaxed">
          Honoring a visionary dedicated to building a sustainable and prosperous Nigeria
        </p>

        <div className="w-24 h-1 bg-gradient-to-r from-emerald to-gold mx-auto mb-12 rounded-full" />

        <p className="text-lg text-celebration-white/80 max-w-xl mx-auto">
          Today we celebrate not just another year, but a lifetime of dedication, 
          vision, and unwavering commitment to our nation's future.
        </p>
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