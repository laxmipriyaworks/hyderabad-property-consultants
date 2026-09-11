import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/data/content";

const TestimonialsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.05 });
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (!inView) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [inView, current]);

  return (
    <section id="testimonials" className="section-padding bg-cream-white relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_hsla(43,56%,52%,0.08)_0%,transparent_60%)]" />
      <div className="container mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="text-secondary font-medium text-sm uppercase tracking-widest">Testimonials</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mt-3">
            What Our <span className="text-gradient-gold">Clients</span> Say
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="max-w-3xl mx-auto">
          <div className="site-card rounded-3xl p-8 md:p-12 text-center relative">
            <Quote className="text-secondary/20 mx-auto mb-6 animate-float" size={48} />
            <p className="text-foreground/80 text-lg md:text-xl leading-relaxed mb-8 italic font-light">
              "{testimonials[current].review}"
            </p>
            <div className="mb-2">
              <h4 className="text-secondary font-heading font-bold text-xl">{testimonials[current].name}</h4>
              <p className="text-muted-foreground text-sm">{testimonials[current].location}</p>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button onClick={prev} className="w-12 h-12 rounded-full border border-secondary/30 flex items-center justify-center text-secondary hover:bg-secondary/10 transition-colors">
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? "bg-secondary w-8" : "bg-secondary/30"}`} />
              ))}
            </div>
            <button onClick={next} className="w-12 h-12 rounded-full border border-secondary/30 flex items-center justify-center text-secondary hover:bg-secondary/10 transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
