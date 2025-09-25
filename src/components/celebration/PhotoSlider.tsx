import { useEffect, useState } from "react";

// Placeholder images - these would be replaced with actual celebration photos
const photos = [
  "/2.jpeg",
  "/1.jpeg",
  "/3.jpeg",
  "/4.jpeg",
  "/24.jpg",
  "/21.jpg",
  "/23.jpg",
  "/22.jpg",
  "/25.jpg",
  "/26.jpg",
  "/major.jpg",
  "/tb.jpg",
  "/tb2.jpg",
  "/blow.jpg",
  "/family.jpg",
];

const PhotoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1); // mobile
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2); // tablet
      } else {
        setItemsPerView(3); // desktop
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);

    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

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
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById("photos-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="photos-section"
      className="py-16 md:py-24 px-4 md:px-6 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-40 h-40 md:w-64 md:h-64 rounded-full bg-emerald/10 blur-3xl animate-gentle-float" />
        <div
          className="absolute bottom-1/4 right-0 w-40 h-40 md:w-64 md:h-64 rounded-full bg-gold/10 blur-3xl animate-gentle-float"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-10 md:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gradient-celebration mb-3 md:mb-4">
            Moments of Impact
          </h2>
          <p className="text-celebration-white/70 text-base md:text-lg">
            Capturing years of Moments
          </p>
        </div>

        {/* Photo Slider */}
        <div className="relative h-72 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden">
          <div
            className="flex transition-transform duration-1000 ease-in-out h-full"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {[...photos, ...photos, ...photos].map((photo, index) => (
              <div
                key={index}
                className={`flex-shrink-0 px-2 sm:px-3 md:px-4 transition-all duration-1000`}
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <div className="relative h-full rounded-xl md:rounded-2xl overflow-hidden group">
                  <img
                    src={photo}
                    alt={`Celebration moment ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Focus Ring */}
                  {Math.floor(index / photos.length) === 1 &&
                    index % photos.length === focusedIndex && (
                      <div className="absolute inset-0 ring-2 md:ring-4 ring-gold/60 ring-offset-2 md:ring-offset-4 ring-offset-transparent rounded-xl md:rounded-2xl" />
                    )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-6 md:mt-8 space-x-2 md:space-x-3">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setFocusedIndex(index);
              }}
              className={`rounded-full transition-all duration-300 ${
                index === focusedIndex
                  ? "bg-gold celebration-glow scale-110 md:scale-125"
                  : "bg-celebration-white/30 hover:bg-celebration-white/50"
              }`}
              style={{
                width: window.innerWidth < 640 ? "0.6rem" : "1rem",
                height: window.innerWidth < 640 ? "0.6rem" : "1rem",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoSlider;
