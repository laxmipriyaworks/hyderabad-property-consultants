import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Mail, User, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export const directors = [
  {
    id: 0,
    name: "Oruganti Ravindra",
    role: "Managing Director",
    desc: "A visionary leader with over 8 years of experience in the Hyderabad real estate market, dedicated to providing transparent and expert property consulting.",
  },
  {
    id: 1,
    name: "K. Venkata Narayana",
    role: "Director",
    desc: "Expert in luxury developments and strategic investments, ensuring our clients identify the most valuable property opportunities in the city.",
  },
  {
    id: 2,
    name: "G. Bharath Kumar",
    role: "Director",
    desc: "Committed to excellence in client service and developer relations, building strong partnerships to bring the best residential projects to our customers.",
  },
];

const DirectorsSection = () => {
  // Middle card by default (Managing Director is at index 0)
  // To have it in the middle, we'll reorder the display or handle the index
  const [activeIndex, setActiveIndex] = useState(0);

  const nextDirector = () => {
    setActiveIndex((prev) => (prev + 1) % directors.length);
  };

  const prevDirector = () => {
    setActiveIndex((prev) => (prev - 1 + directors.length) % directors.length);
  };

  // Helper to get relative position
  const getPosition = (index: number) => {
    const diff = (index - activeIndex + directors.length) % directors.length;
    if (diff === 0) return "middle";
    if (diff === 1) return "right";
    return "left";
  };

  return (
    <section id="directors" className="section-padding bg-cream-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-secondary font-medium text-sm uppercase tracking-widest leading-relaxed">Leadership Team</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mt-3 mb-4">
            Managing <span className="text-gradient-gold">Directors</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto italic">
            Leading with integrity and excellence in Hyderabad real estate.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto min-h-[500px] flex items-center justify-center">
          {/* Navigation Buttons */}
          <button 
            onClick={prevDirector}
            className="absolute -left-1 md:-left-16 top-1/2 -translate-y-1/2 z-40 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white border-2 border-secondary/40 flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-all shadow-lg"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="relative w-full flex items-center justify-center overflow-visible">
            {directors.map((director, i) => {
              const position = getPosition(i);
              const isMiddle = position === "middle";
              
              return (
                <motion.div
                  key={director.id}
                  initial={false}
                  animate={{
                    x: position === "middle" ? 0 : position === "right" ? 320 : -320,
                    scale: isMiddle ? 1 : 0.8,
                    opacity: isMiddle ? 1 : 0.4,
                    zIndex: isMiddle ? 20 : 10,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  onClick={() => setActiveIndex(i)}
                  className={`absolute w-full max-w-[320px] md:max-w-[350px] cursor-pointer group rounded-3xl overflow-hidden text-center p-6 md:p-8 bg-white border-2 ${
                    isMiddle ? "border-secondary/60 shadow-gold" : "border-secondary/20"
                  } transition-all duration-500 shadow-luxury`}
                  style={{ pointerEvents: isMiddle ? "auto" : "auto" }}
                >
                  {isMiddle && (
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-secondary to-transparent" />
                  )}
                  
                  <div className={`relative w-24 h-24 md:w-28 md:h-28 mx-auto mb-6 rounded-full flex items-center justify-center transition-all duration-500 overflow-hidden border-2 ${
                    isMiddle ? "bg-secondary/10 text-secondary border-secondary/30 scale-110" : "bg-secondary/5 text-secondary/60 border-secondary/10"
                  }`}>
                    <User size={36} />
                  </div>
                  
                  <h3 className={`text-lg md:text-2xl font-heading font-bold mb-1 transition-colors duration-300 ${
                    isMiddle ? "text-foreground" : "text-foreground/70"
                  }`}>
                    {director.name}
                  </h3>
                  
                  <p className={`font-semibold text-[10px] md:text-sm uppercase tracking-[0.2em] mb-4 ${
                    isMiddle ? "text-secondary" : "text-secondary/60"
                  }`}>
                    {director.role}
                  </p>
                  
                  <div className={`h-0.5 mx-auto mb-6 transition-all duration-500 rounded-full ${
                    isMiddle ? "w-16 md:w-20 bg-secondary/40" : "w-10 md:w-12 bg-secondary/20"
                  }`} />
                  
                  <p className={`text-xs md:text-sm leading-relaxed mb-6 md:mb-8 font-medium italic transition-all duration-500 ${
                    isMiddle ? "text-muted-foreground opacity-100" : "text-muted-foreground/40 line-clamp-2"
                  }`}>
                    "{director.desc}"
                  </p>
                  
                  {isMiddle && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-center gap-4"
                    >
                      <a href="#" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-secondary/5 flex items-center justify-center text-secondary border border-secondary/10 hover:bg-secondary hover:text-white transition-all duration-300">
                        <Linkedin size={16} />
                      </a>
                      <a href={`mailto:ravindra@hyderabadpropertyconsultants.com`} className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-secondary/5 flex items-center justify-center text-secondary border border-secondary/10 hover:bg-secondary hover:text-white transition-all duration-300">
                        <Mail size={16} />
                      </a>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          <button 
            onClick={nextDirector}
            className="absolute -right-1 md:-right-16 top-1/2 -translate-y-1/2 z-40 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white border-2 border-secondary/40 flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-all shadow-lg"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default DirectorsSection;
