import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import aboutBg from "@/assets/about-bg.jpg";
import { aboutContent, stats } from "@/data/content";

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="text-3xl md:text-4xl font-heading font-bold text-secondary">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.2, margin: "-50px" });

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }} className="relative rounded-2xl overflow-hidden shadow-luxury bg-white">
            <img src={aboutBg} alt="Real estate consultation" className="w-full h-auto object-contain" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
            <span className="text-secondary font-medium text-sm uppercase tracking-widest">{aboutContent.tag}</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mt-3 mb-6 leading-tight">
              {aboutContent.heading}<br />
              <span className="text-gradient-gold">{aboutContent.highlight}</span> {aboutContent.headingSuffix}
            </h2>
            {aboutContent.paragraphs.map((p, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: p }} />
            ))}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <Counter target={stat.value} suffix={stat.suffix} />
                  <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
