import { useState, useRef, useEffect } from "react";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";

const videos = [
  { id: 1, title: "Kairoshof", thumbnail: "/3.jpeg", videoUrl: "vid003.mp4" },
  { id: 2, title: "oko iyawo", thumbnail: "/family.jpg", videoUrl: "vid00.mp4" },
  { id: 3, title: "Energy", thumbnail: "/3.jpeg", videoUrl: "vid002.mp4" },
  { id: 4, title: "Family man to the core", thumbnail: "/2.jpeg", videoUrl: "vid005.mp4" },
  { id: 5, title: "Blow", thumbnail: "/blow.jpg", videoUrl: "vid006.mp4" },
  { id: 6, title: "Nigeria's Future", thumbnail: "/31.jpg", videoUrl: "vid007.mp4" },
];

const VideoGallery = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    const element = document.getElementById("videos-section");
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const handleNext = () => {
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev! + 1) % videos.length);
  };

  const handlePrev = () => {
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev! - 1 + videos.length) % videos.length);
  };

  const activeVideo = activeIndex !== null ? videos[activeIndex] : null;

  return (
    <section id="videos-section" className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-48 h-48 rounded-full bg-emerald/5 blur-3xl animate-gentle-float" />
        <div
          className="absolute bottom-20 right-1/4 w-56 h-56 rounded-full bg-gold/5 blur-3xl animate-gentle-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient-gold mb-4">
            Legacy in Motion
          </h2>
          <p className="text-celebration-white/70 text-lg">
            Stories of transformation and vision for Nigeria's future
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className={`relative group cursor-pointer transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onClick={() => setActiveIndex(index)}
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden celebration-glow">
                <video
                  ref={(el) => (videoRefs.current[video.id] = el)}
                  className="w-full h-full object-cover"
                  poster={video.thumbnail}
                  muted
                >
                  <source src={video.videoUrl} type="video/mp4" />
                </video>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/20" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gold/90 rounded-full flex items-center justify-center backdrop-blur-sm gold-glow group-hover:scale-110 transition">
                    <Play className="w-8 h-8 text-celebration-black ml-1" />
                  </div>
                </div>

                {/* Video Title */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-celebration-white font-semibold text-lg">
                    {video.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controlled Popup Modal */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl animate-fadeIn">
            {/* Clean Close Button */}
            <button
              onClick={() => setActiveIndex(null)}
              className="absolute -top-10 right-0 text-white hover:text-gold transition"
              aria-label="Close"
            >
              <X size={32} />
            </button>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-[-60px] top-1/2 -translate-y-1/2 bg-black/60 p-3 rounded-full hover:bg-gold/70"
            >
              <ChevronLeft className="text-white w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-[-60px] top-1/2 -translate-y-1/2 bg-black/60 p-3 rounded-full hover:bg-gold/70"
            >
              <ChevronRight className="text-white w-6 h-6" />
            </button>

            {/* Video Player with 60vh height */}
            <div className="w-full h-[80vh] md:h-[70vh] rounded-xl overflow-hidden shadow-lg flex items-center justify-center bg-black">
              <video
                key={activeVideo.id}
                className="max-h-full max-w-full object-contain"
                src={activeVideo.videoUrl}
                controls
                autoPlay
              />
            </div>

            <h3 className="text-center text-white mt-4 text-xl font-semibold">
              {activeVideo.title}
            </h3>
          </div>
        </div>
      )}

    </section>
  );
};

export default VideoGallery;
