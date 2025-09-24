import { useEffect, useState } from "react";

// Placeholder images - these would be replaced with actual celebration photos
const photos = [
  "/placeholder.svg?height=600&width=800",
  "/placeholder.svg?height=600&width=800",
  "/placeholder.svg?height=600&width=800",
  "/placeholder.svg?height=600&width=800",
  "/placeholder.svg?height=600&width=800",
  "/placeholder.svg?height=600&width=800",
];

const PhotoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
      setFocusedIndex((prev) => (prev + 1) % photos.length);
    }, 3000);

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

    const element = document.getElementById('photos-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const getPhotoIndex = (baseIndex: number, offset: number) => {
    return (baseIndex + offset) % photos.length;
  };

  return (
    <section id="photos-section" className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-64 h-64 rounded-full bg-emerald/10 blur-3xl animate-gentle-float" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 rounded-full bg-gold/10 blur-3xl animate-gentle-float" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient-celebration mb-4">
            Moments of Impact
          </h2>
          <p className="text-celebration-white/70 text-lg">
            Capturing years of dedication and service to Nigeria
          </p>
        </div>

        {/* Photo Slider */}
        <div className="relative h-96 md:h-[500px] overflow-hidden">
          <div 
            className="flex transition-transform duration-1000 ease-in-out h-full"
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {[...photos, ...photos, ...photos].map((photo, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-1/3 px-4 transition-all duration-1000 ${
                  Math.floor(index / photos.length) === 1 && (index % photos.length) === focusedIndex
                    ? 'slide-focus focused'
                    : 'slide-focus'
                }`}
              >
                <div className="relative h-full rounded-2xl overflow-hidden group">
                  <img
                    src={photo}
                    alt={`Celebration moment ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Focus Effect */}
                  {Math.floor(index / photos.length) === 1 && (index % photos.length) === focusedIndex && (
                    <div className="absolute inset-0 ring-4 ring-gold/60 ring-offset-4 ring-offset-transparent rounded-2xl" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-8 space-x-3">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setFocusedIndex(index);
              }}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === focusedIndex
                  ? 'bg-gold celebration-glow scale-125'
                  : 'bg-celebration-white/30 hover:bg-celebration-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoSlider;