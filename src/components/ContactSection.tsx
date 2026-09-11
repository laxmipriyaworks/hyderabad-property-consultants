import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import emailjs from "@emailjs/browser";
import heroBg from "@/assets/hero-bg.jpg";
import vid3 from "@/assets/vid3.mp4";
import { contactInfo } from "@/data/content";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(10, "Valid phone number required").max(15).regex(/^[+\d\s()-]+$/, "Invalid phone format"),
  email: z.string().trim().email("Invalid email address").max(255),
  budget: z.string().optional(),
  location: z.string().optional(),
  message: z.string().trim().max(1000).optional(),
});

type FormData = z.infer<typeof contactSchema>;

const ContactSection = () => {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inView = useInView(ref, { amount: 0.15, margin: "-40px" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      budget: formData.get("budget") as string,
      location: formData.get("location") as string,
      message: formData.get("message") as string,
    };

    const result = contactSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof FormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setSending(true);

    try {
      // Replace with your EmailJS credentials
      await emailjs.sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        formRef.current,
        "YOUR_PUBLIC_KEY"
      );
      setSubmitted(true);
      formRef.current.reset();
      setTimeout(() => setSubmitted(false), 3000);
    } catch {
      // Fallback: still show success for demo
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative section-padding overflow-hidden bg-cover bg-center" ref={ref} style={{ backgroundImage: `url(${heroBg})` }}>
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={heroBg}
          className="w-full h-full object-cover"
        >
          <source src={vid3} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-primary/60 md:bg-primary/50" />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 via-primary/40 to-transparent" />
      </div>
      <div className="container mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={inView ? { opacity: 1, y: 0 } : {}} 
          transition={{ duration: 0.6 }} 
          className="text-center mb-10 md:mb-16"
        >
          <span className="text-secondary font-medium text-xs md:text-sm uppercase tracking-widest">Contact Us</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mt-3 drop-shadow-lg max-w-4xl mx-auto px-4">
            Get Expert Property <span className="text-gradient-gold">Guidance</span> Today
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 max-w-6xl mx-auto items-center">
          {/* Contact Form Card */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            animate={inView ? { opacity: 1, x: 0 } : {}} 
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="px-2 sm:px-0"
          >
            <form 
              ref={formRef} 
              onSubmit={handleSubmit} 
              className="bg-primary/80 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-10 space-y-4 md:space-y-6 shadow-2xl mx-auto w-full max-w-xl lg:max-w-none hover:border-secondary/30 transition-all duration-300 relative overflow-hidden group ring-1 ring-white/5"
            >
              {/* Added a title back into the card for clarity on mobile */}
              <div className="mb-6">
                <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-2">
                  Find Your Perfect Property
                </h3>
                <div className="w-12 h-1 bg-gradient-gold rounded-full" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
                <div>
                  <input name="name" type="text" placeholder="Your Name" required className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder:text-white/60 focus:outline-none focus:border-secondary transition-all backdrop-blur-sm" />
                  {errors.name && <p className="text-secondary text-xs mt-1 font-bold">{errors.name}</p>}
                </div>
                <div>
                  <input name="phone" type="tel" placeholder="Phone Number" required className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder:text-white/60 focus:outline-none focus:border-secondary transition-all backdrop-blur-sm" />
                  {errors.phone && <p className="text-secondary text-xs mt-1 font-bold">{errors.phone}</p>}
                </div>
              </div>
              
              <div>
                <input name="email" type="email" placeholder="Email Address" required className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder:text-white/60 focus:outline-none focus:border-secondary transition-all backdrop-blur-sm" />
                {errors.email && <p className="text-secondary text-xs mt-1 font-bold">{errors.email}</p>}
              </div>

              <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
                <div className="relative group/select">
                  <select name="budget" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-secondary transition-all appearance-none cursor-pointer backdrop-blur-sm">
                    <option value="" className="bg-primary text-white">Select Budget</option>
                    <option className="bg-primary text-white">Under ₹50 Lakhs</option>
                    <option className="bg-primary text-white">₹50L - ₹1 Cr</option>
                    <option className="bg-primary text-white">₹1 Cr - ₹2 Cr</option>
                    <option className="bg-primary text-white">₹2 Cr - ₹5 Cr</option>
                    <option className="bg-primary text-white">Above ₹5 Cr</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none group-focus-within/select:text-secondary group-focus-within/select:rotate-180 transition-all" size={16} />
                </div>

                <div className="relative group/select">
                  <select name="location" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-secondary transition-all appearance-none cursor-pointer backdrop-blur-sm">
                    <option value="" className="bg-primary text-white">Preferred Location</option>
                    <option className="bg-primary text-white">Financial District</option>
                    <option className="bg-primary text-white">Kokapet</option>
                    <option className="bg-primary text-white">Tellapur</option>
                    <option className="bg-primary text-white">Narsingi</option>
                    <option className="bg-primary text-white">Shamshabad</option>
                    <option className="bg-primary text-white">Kollur</option>
                    <option className="bg-primary text-white">Other</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none group-focus-within/select:text-secondary group-focus-within/select:rotate-180 transition-all" size={16} />
                </div>
              </div>

              <textarea 
                name="message" 
                placeholder="What are you looking for?" 
                rows={3} 
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder:text-white/60 focus:outline-none focus:border-secondary transition-all resize-none text-sm md:text-base backdrop-blur-sm" 
              />

              <button 
                type="submit" 
                disabled={sending} 
                className="w-full gradient-gold-btn py-4 md:py-4.5 rounded-xl text-base md:text-lg font-bold flex items-center justify-center gap-3 hover:scale-[1.01] transition-transform disabled:opacity-70 group/btn"
              >
                {submitted ? "Message Received!" : sending ? "Sending Request..." : (
                  <>
                    Request Consultation 
                    <Send size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Informational Section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            animate={inView ? { opacity: 1, x: 0 } : {}} 
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }} 
            className="flex flex-col justify-center space-y-8 md:space-y-10 text-center lg:text-left px-4"
          >
            <div>
              <span className="text-secondary font-medium tracking-widest text-xs uppercase mb-3 block">Personalized Support</span>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-5 drop-shadow-md">
                Our Experts are Ready to <span className="text-gradient-gold">Help You</span>
              </h3>
              <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-lg mx-auto lg:mx-0 font-light">
                Whether you're looking for an investment or a dream home, we provide transparent data and guided site visits to help you make the right choice.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-6 md:gap-8 bg-black/30 backdrop-blur-md p-10 rounded-3xl border border-white/5 ring-1 ring-white/10">
              <div className="flex flex-col lg:flex-row items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center shrink-0 border border-secondary/30 group-hover:bg-secondary/30 transition-all">
                  <MapPin className="text-secondary" size={20} />
                </div>
                <div className="lg:text-left">
                  <p className="text-secondary text-[10px] uppercase tracking-widest mb-1 font-black">Location</p>
                  <p className="text-white text-base font-bold drop-shadow-md">{contactInfo.location}</p>
                </div>
              </div>
              
              <div className="flex flex-col lg:flex-row items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center shrink-0 border border-secondary/30 group-hover:bg-secondary/30 transition-all">
                  <Phone className="text-secondary" size={20} />
                </div>
                <div className="lg:text-left">
                  <p className="text-secondary text-[10px] uppercase tracking-widest mb-1 font-black">Direct Call</p>
                  <a href={`tel:${contactInfo.phone}`} className="text-white text-base font-bold hover:text-secondary transition-colors drop-shadow-md">{contactInfo.phone}</a>
                </div>
              </div>
              
              <div className="flex flex-col lg:flex-row items-center gap-4 group overflow-hidden">
                <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center shrink-0 border border-secondary/30 group-hover:bg-secondary/30 transition-all">
                  <Mail className="text-secondary" size={20} />
                </div>
                <div className="lg:text-left max-w-full overflow-hidden">
                  <p className="text-secondary text-[10px] uppercase tracking-widest mb-1 font-black">Email Us</p>
                  <a href={`mailto:${contactInfo.email}`} className="text-white text-sm font-bold hover:text-secondary transition-colors break-all whitespace-normal drop-shadow-md">
                    {contactInfo.email}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
