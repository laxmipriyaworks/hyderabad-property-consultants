import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import { mainNavLinks, companyDropdownLinks, contactInfo } from "@/data/content";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCompanyOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setCompanyOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) => location.pathname === href;
  const isCompanyActive = companyDropdownLinks.some((link) => isActive(link.href));

  const isHomePage = location.pathname === "/";
  const headerBg = (scrolled || !isHomePage || mobileOpen)
    ? "bg-[#05080a] shadow-luxury py-3"
    : "bg-transparent py-5";
    if (location.pathname === "/auro-sapphire") {
  return null;
}

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Hyderabad Property Consultants"
            className={`w-auto transition-all duration-500 ${(scrolled || !isHomePage) ? "h-14 md:h-16" : "h-20 md:h-24"}`}
          />
        </Link>

        {/* Desktop Nav — Center */}
        <nav className="hidden xl:flex items-center gap-7">
          {mainNavLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-semibold transition-all duration-300 relative py-1 px-1 group drop-shadow-sm ${isActive(link.href)
                ? "text-secondary"
                : "text-white/90 hover:text-secondary"
                }`}
            >
              {link.label}

              {/* Sliding Bottom Border */}
              {isActive(link.href) && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-secondary rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              {/* Hover Underline (Expanding) */}
              {!isActive(link.href) && (
                <div className="absolute -bottom-1 left-1/2 w-0 h-[2px] bg-secondary/40 group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full" />
              )}
            </Link>
          ))}

          {/* Company Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setCompanyOpen(!companyOpen)}
              className={`flex items-center gap-1 text-sm font-semibold transition-all duration-300 relative py-1 px-1 group drop-shadow-sm ${isCompanyActive ? "text-secondary" : "text-white/90 hover:text-secondary"
                }`}
            >
              Company
              <ChevronDown
                size={15}
                className={`transition-transform duration-300 ${companyOpen ? "rotate-180" : ""}`}
              />

              {/* Sliding Bottom Border */}
              {isCompanyActive && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-secondary rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              {/* Hover Underline (Expanding) */}
              {!isCompanyActive && (
                <div className="absolute -bottom-1 left-1/2 w-0 h-[2px] bg-secondary/40 group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full" />
              )}
            </button>
            <AnimatePresence>
              {companyOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 bg-[#05080a] rounded-xl border border-secondary/15 shadow-luxury overflow-hidden"
                >
                  {companyDropdownLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`block px-5 py-3 text-sm transition-colors duration-200 ${isActive(link.href)
                        ? "text-secondary bg-secondary/10"
                        : "text-primary-foreground/80 hover:text-secondary hover:bg-secondary/5"
                        }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={`tel:${contactInfo.phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-2 text-white/90 hover:text-secondary transition-all text-sm drop-shadow-sm"
          >
            <Phone size={16} />
            <span>{contactInfo.phone}</span>
          </a>
          <Link
            to="/contact"
            className="gradient-gold-btn px-5 py-2.5 rounded-lg text-sm"
          >
            Book Consultation
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="xl:hidden text-primary-foreground"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-[#05080a] border-t border-secondary/20"
          >
            <nav className="flex flex-col p-6 gap-4">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-lg font-medium transition-colors ${isActive(link.href) ? "text-secondary" : "text-primary-foreground/90 hover:text-secondary"
                    }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Company Accordion */}
              <button
                onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
                className="flex items-center justify-between text-lg font-medium text-primary-foreground/90"
              >
                Company
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${mobileCompanyOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {mobileCompanyOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pl-4 flex flex-col gap-3"
                  >
                    {companyDropdownLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        className={`text-base transition-colors ${isActive(link.href) ? "text-secondary" : "text-primary-foreground/70 hover:text-secondary"
                          }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <Link
                to="/contact"
                className="gradient-gold-btn px-6 py-3 rounded-lg text-center mt-2"
              >
                Book Consultation
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
