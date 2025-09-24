import { useState, useEffect } from "react";
import { Heart, Users, MessageCircle } from "lucide-react";

// Sample wishes data - these would be replaced with actual wishes from friends and family
const wishes = [
  {
    id: 1,
    type: "video",
    author: "Dr. Amina Kano",
    relationship: "Colleague & Friend",
    content: "Your dedication to sustainable development has inspired countless people across Nigeria...",
    thumbnail: "/placeholder.svg?height=200&width=300",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 2,
    type: "image",
    author: "Chief Emeka Okafor",
    relationship: "Business Partner",
    content: "Happy birthday to a true visionary! Your leadership continues to shape our nation's future.",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    type: "text",
    author: "Prof. Fatima Abdullahi",
    relationship: "Academic Collaborator",
    content: "On this special day, we celebrate not just your birthday, but your unwavering commitment to building a sustainable Nigeria. Your work in environmental policy has created lasting change that will benefit generations to come. Wishing you continued success and many more years of impactful leadership!",
  },
  {
    id: 4,
    type: "video",
    author: "Hon. Peter Okonkwo",
    relationship: "Legislative Partner",
    content: "Thank you for your tireless work in environmental conservation...",
    thumbnail: "/placeholder.svg?height=200&width=300",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 5,
    type: "image",
    author: "Mrs. Grace Adebayo",
    relationship: "Community Leader",
    content: "Your grassroots approach to development has touched so many lives in our communities.",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
];

const WishesSection = () => {
  const [selectedWish, setSelectedWish] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('wishes-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const renderWishContent = (wish: typeof wishes[0]) => {
    if (wish.type === 'video') {
      return (
        <div className="aspect-video rounded-xl overflow-hidden mb-4">
          <video
            controls
            className="w-full h-full object-cover"
            poster={wish.thumbnail}
          >
            <source src={wish.videoUrl} type="video/mp4" />
          </video>
        </div>
      );
    } else if (wish.type === 'image') {
      return (
        <div className="aspect-video rounded-xl overflow-hidden mb-4">
          <img
            src={wish.imageUrl}
            alt={`Wish from ${wish.author}`}
            className="w-full h-full object-cover"
          />
        </div>
      );
    }
    return null;
  };

  return (
    <section id="wishes-section" className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-emerald/10 to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-32 bg-gradient-to-t from-gold/10 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center mb-6">
            <Heart className="w-12 h-12 text-gold mr-4" />
            <h2 className="text-4xl md:text-5xl font-bold text-gradient-celebration">
              With Love
            </h2>
            <Heart className="w-12 h-12 text-gold ml-4" />
          </div>
          <p className="text-celebration-white/70 text-lg">
            Heartfelt messages from friends, family, and colleagues
          </p>
        </div>

        {/* Wishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishes.map((wish, index) => (
            <div
              key={wish.id}
              className={`bg-card/80 backdrop-blur-sm rounded-2xl p-6 cursor-pointer transition-all duration-500 hover:celebration-glow hover:scale-105 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onClick={() => setSelectedWish(selectedWish === wish.id ? null : wish.id)}
            >
              {/* Wish Header */}
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0">
                  {wish.type === 'video' && <MessageCircle className="w-6 h-6 text-gold" />}
                  {wish.type === 'image' && <Users className="w-6 h-6 text-emerald" />}
                  {wish.type === 'text' && <Heart className="w-6 h-6 text-gold" />}
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-celebration-white font-semibold text-lg">
                    {wish.author}
                  </h3>
                  <p className="text-gold text-sm">
                    {wish.relationship}
                  </p>
                </div>
              </div>

              {/* Wish Content */}
              {selectedWish === wish.id && renderWishContent(wish)}
              
              <p className={`text-celebration-white/80 leading-relaxed ${
                selectedWish === wish.id && wish.type !== 'text' ? 'mt-4' : ''
              } ${
                wish.type === 'text' ? 'text-base' : 'text-sm'
              }`}>
                {wish.content}
              </p>

              {/* Expand Indicator */}
              <div className="mt-4 flex justify-center">
                <div className={`w-8 h-1 bg-gold rounded-full transition-transform duration-300 ${
                  selectedWish === wish.id ? 'rotate-90' : ''
                }`} />
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto celebration-glow">
            <h3 className="text-2xl font-bold text-gradient-gold mb-4">
              Join the Celebration
            </h3>
            <p className="text-celebration-white/80 mb-6">
              Add your own message of appreciation and birthday wishes
            </p>
            <button className="bg-gradient-to-r from-emerald to-emerald-light text-celebration-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-300 celebration-glow">
              Send Your Wishes
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WishesSection;