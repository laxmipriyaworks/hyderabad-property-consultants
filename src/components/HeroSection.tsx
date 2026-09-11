import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import hydDrone1 from "@/assets/main-video.mp4";
import { heroContent } from "@/data/content";

// Global cache flag to ensure the video loader only ever plays once per browsing session
let globalVideoLoaded = false;

const HeroSection = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(globalVideoLoaded);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const containerRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState >= 3) {
      setIsVideoLoaded(true);
    }
  }, []);

  // Anti-suspend hack for mobile browsers pausing heavy videos on scroll
  useEffect(() => {
    if (!isMobile || !videoRef.current) return;
    
    const ensurePlay = () => {
      if (videoRef.current?.paused) {
        videoRef.current.play().catch(() => {});
      }
    };

    window.addEventListener("scroll", ensurePlay, { passive: true });
    window.addEventListener("touchstart", ensurePlay, { passive: true });

    return () => {
      window.removeEventListener("scroll", ensurePlay);
      window.removeEventListener("touchstart", ensurePlay);
    };
  }, [isMobile]);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  // Keep scale at 1 to prevent blurring/pixelation from artificial zoom
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.03]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#05080a]"
    >
      <motion.div 
        style={isMobile ? {} : { y: videoY, scale: videoScale, opacity }} 
        className="absolute inset-0 bg-[#05080a] will-change-transform"
      >
        {/* Elegant Loading Spinner shown until video is ready */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${isVideoLoaded ? "opacity-0 invisible" : "opacity-100"}`}>
          <div className="w-12 h-12 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin"></div>
        </div>

        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline="true"
          x5-playsinline="true"
          disablePictureInPicture
          preload="auto"
          onLoadedData={() => {
            setIsVideoLoaded(true);
            globalVideoLoaded = true;
          }}
          className={`w-full h-full object-cover pointer-events-none transition-opacity duration-1000 ease-in-out ${isVideoLoaded ? "opacity-100" : "opacity-0"}`}
        >
          <source src={hydDrone1} type="video/mp4" />
        </video>
        {/* Removed all dark overlays so the video is 100% visible and bright */}
      </motion.div>


      <div className="relative z-10 container mx-auto px-4 text-center max-w-5xl pt-28 md:pt-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mb-6">
          <span className="inline-block px-5 py-2 rounded-full border border-secondary/60 text-secondary text-xs sm:text-sm font-bold tracking-[0.15em] uppercase bg-black/20 backdrop-blur-sm shadow-xl">
            {heroContent.badge}
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7, delay: 0.2 }} 
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight mb-6 drop-shadow-2xl"
        >
          {heroContent.heading}{" "}
          <span className="text-gradient-gold">{heroContent.highlight}</span>
          <br className="hidden sm:block" />
          <span className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-light italic text-white/90 block sm:inline mt-2 sm:mt-0">
            {heroContent.subheading}
          </span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-10 font-light leading-relaxed drop-shadow-md">
          {heroContent.description}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/projects" className="gradient-gold-btn px-8 py-4 rounded-lg text-lg">
            {heroContent.ctaPrimary}
          </Link>
          <Link to="/contact" className="site-button-outline px-8 py-4 rounded-lg text-lg font-semibold">
            {heroContent.ctaSecondary}
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-primary-foreground/40 rounded-full flex justify-center pt-2">
            <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-1.5 bg-secondary rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
