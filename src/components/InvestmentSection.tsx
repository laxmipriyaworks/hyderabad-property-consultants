import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { TrendingUp, Star, MapPin } from "lucide-react";
import investmentBg from "@/assets/investment-bg.jpg";
import vid1 from "@/assets/vid1.mp4";
import { investmentAreas } from "@/data/content";

const InvestmentSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.05 });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const videoY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["-5%", "5%"]);

  return (
    <section id="investment" className="relative section-padding overflow-hidden bg-cover bg-center" ref={ref} style={{ backgroundImage: `url(${investmentBg})` }}>
      <div className="absolute inset-0">
        <motion.div style={{ y: videoY }} className="absolute inset-0 will-change-transform">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={investmentBg}
            className="w-full h-full object-cover scale-110"
          >
            <source src={vid1} type="video/mp4" />
          </video>
        </motion.div>
        <div className="absolute inset-0 bg-[#000d1a]/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000d1a]/60 via-transparent to-[#000d1a]/70" />
      </div>
      <div className="container mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="text-secondary font-medium text-sm uppercase tracking-widest leading-relaxed">Investment Opportunities</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mt-3 mb-4 drop-shadow-lg">
            Hyderabad's <span className="text-gradient-gold">Hottest</span> Investment Zones
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto drop-shadow-md font-medium">
            Hyderabad continues to attract investors due to rapid IT growth, world-class infrastructure, and high rental demand.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {investmentAreas.map((area, i) => (
            <motion.div key={area.name} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.05 }} className="investment-card p-7 cursor-pointer group">
              <div className="flex items-center gap-3 mb-5 group-hover:translate-x-1 transition-transform">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 border border-secondary/20 group-hover:bg-secondary/20 transition-all">
                  <MapPin className="text-secondary" size={20} />
                </div>
                <h3 className="font-heading font-bold text-xl text-foreground">{area.name}</h3>
              </div>
              <div className="space-y-3.5">
                <div className="flex justify-between items-center text-sm md:text-base">
                  <span className="text-muted-foreground font-medium">Growth Potential</span>
                  <span className="text-secondary font-black tracking-wide uppercase text-xs">{area.growth}</span>
                </div>
                <div className="flex justify-between items-center text-sm md:text-base">
                  <span className="text-muted-foreground font-medium">Expected ROI</span>
                  <span className="text-secondary font-black text-lg">{area.roi}</span>
                </div>
                <div className="flex items-center gap-1.5 pt-2 border-t border-secondary/10 mt-2">
                  {Array.from({ length: area.rating }).map((_, j) => (
                    <Star key={j} className="text-secondary fill-secondary drop-shadow-glow" size={16} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestmentSection;
