import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { processSteps } from "@/data/content";

const HowWeWork = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.05 });

  return (
    <section id="process" className="section-padding" ref={ref}>
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="text-secondary font-medium text-sm uppercase tracking-widest">How We Work</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mt-3">
            Simple & <span className="text-gradient-gold">Transparent</span> Process
          </h2>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, i) => (
              <motion.div key={step.num} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.05 }} className="relative site-card rounded-2xl p-8 text-center hover:-translate-y-2 transition-all duration-500">
                <div className="w-14 h-14 rounded-full gradient-gold-btn flex items-center justify-center mx-auto mb-5">
                  <span className="text-lg font-bold">{step.num}</span>
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
