import HeroSection from "@/components/celebration/HeroSection";
import StatementsCarousel from "@/components/celebration/StatementsCarousel";
import PhotoSlider from "@/components/celebration/PhotoSlider";
import VideoGallery from "@/components/celebration/VideoGallery";
import WishesSection from "@/components/celebration/WishesSection";
import PhysicsBackground from "@/components/celebration/PhysicsBackground";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden relative">
      <PhysicsBackground />
      <div className="relative z-10">
        <HeroSection />
        <StatementsCarousel />
        <PhotoSlider />
        <VideoGallery />
        <WishesSection />
        
        {/* Footer */}
        <footer className="py-12 text-center border-t border-gold/20">
          <p className="text-celebration-white/60">
            Celebrating a life dedicated to building a sustainable Nigeria
          </p>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-emerald to-gold mx-auto rounded-full" />
        </footer>
      </div>
    </div>
  );
};

export default Index;
