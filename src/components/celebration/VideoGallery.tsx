import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";

// Placeholder video data - these would be replaced with actual video URLs
const videos = [
  {
    id: 1,
    title: "Leadership Excellence",
    thumbnail: "/placeholder.svg?height=300&width=400",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 2,
    title: "Sustainable Vision",
    thumbnail: "/placeholder.svg?height=300&width=400",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 3,
    title: "Community Impact",
    thumbnail: "/placeholder.svg?height=300&width=400",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 4,
    title: "Building Tomorrow",
    thumbnail: "/placeholder.svg?height=300&width=400",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 5,
    title: "Innovation Journey",
    thumbnail: "/placeholder.svg?height=300&width=400",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 6,
    title: "Nigeria's Future",
    thumbnail: "/placeholder.svg?height=300&width=400",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
];

const VideoGallery = () => {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('videos-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const handleVideoClick = (videoId: number) => {
    const currentVideo = videoRefs.current[videoId];
    if (!currentVideo) return;

    if (playingId === videoId) {
      // Pause current video
      currentVideo.pause();
      setPlayingId(null);
    } else {
      // Pause any currently playing video
      if (playingId && videoRefs.current[playingId]) {
        videoRefs.current[playingId]!.pause();
      }
      
      // Play the selected video
      currentVideo.play();
      setPlayingId(videoId);
    }
  };

  return (
    <section id="videos-section" className="py-24 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-48 h-48 rounded-full bg-emerald/5 blur-3xl animate-gentle-float" />
        <div className="absolute bottom-20 right-1/4 w-56 h-56 rounded-full bg-gold/5 blur-3xl animate-gentle-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
              className={`relative group cursor-pointer transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              } ${
                playingId === null ? 'spiral-hover' : playingId === video.id ? '' : 'opacity-50 scale-95'
              }`}
              style={{ 
                transitionDelay: `${index * 150}ms`,
                animation: playingId === null ? `spiralRotate 4s ease-in-out infinite ${index * 0.5}s` : 'none'
              }}
              onClick={() => handleVideoClick(video.id)}
            >
              {/* Video Container */}
              <div className="relative aspect-video rounded-2xl overflow-hidden celebration-glow">
                <video
                  ref={(el) => (videoRefs.current[video.id] = el)}
                  className="w-full h-full object-cover"
                  poster={video.thumbnail}
                  muted
                  onEnded={() => setPlayingId(null)}
                >
                  <source src={video.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Overlay */}
                <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
                  playingId === video.id ? 'opacity-0' : 'opacity-100'
                }`} />

                {/* Play/Pause Button */}
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                  playingId === video.id ? 'opacity-0' : 'opacity-100 group-hover:scale-110'
                }`}>
                  <div className="w-16 h-16 bg-gold/90 rounded-full flex items-center justify-center backdrop-blur-sm gold-glow">
                    {playingId === video.id ? (
                      <Pause className="w-8 h-8 text-celebration-black" />
                    ) : (
                      <Play className="w-8 h-8 text-celebration-black ml-1" />
                    )}
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
    </section>
  );
};

export default VideoGallery;