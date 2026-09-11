import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import heroBg from "@/assets/hero-bg.jpg";
import { footerQuickLinks, footerServices, contactInfo } from "@/data/content";

const Footer = () => {
  return (
    <footer className="border-t border-secondary/10 relative">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <img src={logo} alt="Hyderabad Property Consultants" className="h-16 w-auto mb-4" />
            <p className="text-muted-foreground/60 text-sm leading-relaxed">
              Your trusted real estate advisory partner in Hyderabad. We help you make the right property decisions with confidence.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-foreground text-lg mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {footerQuickLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-muted-foreground/60 hover:text-secondary transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-foreground text-lg mb-5">Services</h4>
            <ul className="space-y-3">
              {footerServices.map((s) => (
                <li key={s} className="group flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary/30 group-hover:bg-secondary transition-colors shrink-0" />
                  <span className="text-muted-foreground/60 group-hover:text-secondary transition-colors text-sm cursor-pointer">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-foreground text-lg mb-5">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group cursor-pointer">
                <div className="w-5 flex justify-center shrink-0">
                  <MapPin className="text-secondary mt-0.5" size={16} />
                </div>
                <span className="text-muted-foreground/60 group-hover:text-secondary transition-colors text-sm">{contactInfo.location}</span>
              </div>
              <a href={`tel:${contactInfo.phone.replace(/\s+/g, "")}`} className="flex items-center gap-3 group cursor-pointer">
                <div className="w-5 flex justify-center shrink-0">
                  <Phone className="text-secondary group-hover:scale-110 transition-transform" size={16} />
                </div>
                <span className="text-muted-foreground/60 group-hover:text-secondary transition-colors text-sm">{contactInfo.phone}</span>
              </a>
              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-3 group cursor-pointer">
                <div className="w-5 flex justify-center shrink-0">
                  <Mail className="text-secondary group-hover:scale-110 transition-transform" size={16} />
                </div>
                <span className="text-muted-foreground/60 group-hover:text-secondary transition-colors text-sm break-all">{contactInfo.email}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/10">
          <div className="relative overflow-hidden py-10 text-center">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-heading font-black tracking-tighter select-none opacity-20 hover:opacity-100 transition-opacity duration-700 cursor-pointer"
              style={{
                backgroundImage: `url(${heroBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
              HYDERABAD PROPERTY CONSULTANTS
            </h1>
          </div>

          <div className="mt-8 flex justify-between">
            <p className="text-muted-foreground/40 text-sm"><span className="text-muted-foreground/40">Developed by </span><a href="https://www.abhivorn.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground/40 hover:text-secondary transition-colors">Abhivorn Technologies Pvt. Ltd</a></p>
            <p className="text-muted-foreground/40 hover:text-secondary transition-colors cursor-pointer text-sm">
              © {new Date().getFullYear()} Hyderabad Property Consultants. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
