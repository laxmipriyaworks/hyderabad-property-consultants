import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { whyChooseUsPoints } from "@/data/content";

const WhyChooseUs = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.1 });

  return (
    <section id="why-us" className="relative section-padding overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_hsla(43,56%,52%,0.06)_0%,transparent_50%)]" />
      <div className="container mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="text-secondary font-medium text-sm uppercase tracking-widest">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mt-3">
            The Smart Way to <span className="text-gradient-gold">Buy Property</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {whyChooseUsPoints.map((point, i) => (
            <motion.div key={point.title} initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.4, delay: i * 0.08 }} className="site-card rounded-2xl p-6 text-center hover:bg-secondary/5 transition-all duration-500 group cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                <point.icon className="text-secondary" size={22} />
              </div>
              <h3 className="font-heading font-semibold text-foreground text-lg">{point.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
