import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";



const Preloader = () => {
    const [loading, setLoading] = useState(true);

    const hidePreloader =
        window.location.pathname === "/auro-sapphire";
        window.location.pathname === "/auro-sapphire/thank-you";

    useEffect(() => {
        // Minimum preloader time
        const minTime = 2000;
        const startTime = Date.now();

        const handleLoad = () => {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, minTime - elapsedTime);

            setTimeout(() => {
                setLoading(false);
            }, remainingTime);
        };

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
            const timeout = setTimeout(handleLoad, 6000); // Safety timeout
            
            return () => {
                window.removeEventListener('load', handleLoad);
                clearTimeout(timeout);
            };
        }
    }, []);
if (hidePreloader) {
    return null;
}
    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ 
                        opacity: 0,
                        transition: { duration: 1.2, ease: "easeInOut" }
                    }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0d0d0d] overflow-hidden"
                >
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(207,158,61,0.1),transparent_70%)]" />
                    
                    <div className="relative flex flex-col items-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="mb-8"
                        >
                            <img 
                                src={logo} 
                                alt="Hyderabad Property Consultants" 
                                className="h-24 md:h-32 w-auto drop-shadow-[0_0_25px_rgba(207,158,61,0.4)]" 
                            />
                        </motion.div>

                        {/* Progress Bar Container */}
                        <div className="w-56 h-[1px] bg-white/5 rounded-full overflow-hidden relative">
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: "0%" }}
                                transition={{ duration: 2.5, ease: "linear" }}
                                className="absolute inset-0 bg-gradient-to-r from-secondary/20 via-secondary to-secondary/20"
                            />
                        </div>
                        
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0.6, 1] }}
                            transition={{ delay: 0.4, duration: 2, repeat: Infinity }}
                            className="mt-6 text-secondary/70 text-[10px] uppercase tracking-[0.5em] font-medium"
                        >
                            Elevating Lifestyle
                        </motion.p>
                    </div>

                    {/* Decorative Background Element */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.05, scale: 1.2 }}
                        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                        className="absolute w-[800px] h-[800px] border border-secondary/30 rounded-full"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
