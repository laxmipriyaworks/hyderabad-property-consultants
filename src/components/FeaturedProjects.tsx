import { motion, useInView } from "framer-motion";
import { useRef, useCallback } from "react";
import { MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import projectGrandOaks from "@/assets/project-grand-oaks.png";
import projectBhoojaVillas from "@/assets/project-bhooja-villas.png";
import projectAparnaSarovar from "@/assets/project-aparna-sarovar.png";
import projectPhoenixOne from "@/assets/project-phoenix-one.png";
import projectRajapushpaAtria from "@/assets/project-rajapushpa-atria.png";
import { projects } from "@/data/content";

const imageMap: Record<string, string> = {
  "prestige-golden-grove": project1,
  "rajapushpa-sierra": project2,
  "brigade-gateway": project3,
  "prestige-clairemont": projectGrandOaks,
  "rajapushpa-skyra": projectPhoenixOne,
  "lansum-elena": projectBhoojaVillas,
  "lansum-encanto": projectAparnaSarovar,
  "rajapushpa-provincia": projectRajapushpaAtria,
};

const FeaturedProjects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.05 });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="projects" className="section-padding bg-cream-white" ref={ref}>
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="text-secondary font-medium text-sm uppercase tracking-widest">Featured Projects</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mt-3">
            Discover the Best Projects in <span className="text-gradient-gold">Hyderabad</span>
          </h2>
        </motion.div>

        <div className="relative group/carousel">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {projects.map((project, i) => (
                <div
                  key={i}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] xl:flex-[0_0_25%] px-3"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="group site-card rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-500 h-full cursor-pointer flex flex-col"
                  >
                    <div className="relative overflow-hidden h-52 sm:h-56">
                      <img src={imageMap[project.image]} alt={project.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                      <div className="absolute top-4 left-4 flex gap-2 items-center">
                        <div className="w-8 h-8 rounded-full gradient-gold-btn flex items-center justify-center text-xs font-bold shadow-lg">
                          {String(i + 1).padStart(2, '0')}
                        </div>
                        <span className="bg-primary/60 backdrop-blur-md text-secondary border border-secondary/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">{project.type}</span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-lg font-heading font-bold text-foreground mb-2 group-hover:text-secondary transition-colors line-clamp-2">{project.name}</h3>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
                        <MapPin size={14} className="text-secondary" />
                        <span>{project.location}</span>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/50">
                        <span className="text-secondary font-bold text-lg">{project.price}</span>
                        <Link to="/contact" className="flex items-center gap-1 text-primary hover:text-secondary transition-colors text-sm font-medium">
                          Enquire <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center text-foreground hover:bg-secondary hover:text-white transition-all shadow-lg opacity-0 group-hover/carousel:opacity-100 group-hover/carousel:translate-x-0 z-20"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center text-foreground hover:bg-secondary hover:text-white transition-all shadow-lg opacity-0 group-hover/carousel:opacity-100 group-hover/carousel:translate-x-0 z-20"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
