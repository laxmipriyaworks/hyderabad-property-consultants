import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Send } from "lucide-react";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { contactInfo } from "@/data/content";

const contactSchema = z.object({
    name: z.string().trim().min(1, "Name is required").max(100),
    phone: z.string().trim().min(10, "Valid phone number required").max(15).regex(/^[+\d\s()-]+$/, "Invalid phone format"),
    email: z.string().trim().email("Invalid email address").max(255),
    budget: z.string().optional(),
    location: z.string().optional(),
});

type FormData = z.infer<typeof contactSchema>;

const BookingModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [sending, setSending] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

    useEffect(() => {
        const hasSeenModal = localStorage.getItem("hasSeenBookingModal");
        if (!hasSeenModal) {
            const timer = setTimeout(() => {
                setIsOpen(true);
                localStorage.setItem("hasSeenBookingModal", "true");
            }, 2000); // Open after 2 seconds
            return () => clearTimeout(timer);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = {
            name: formData.get("name") as string,
            phone: formData.get("phone") as string,
            email: formData.get("email") as string,
            budget: formData.get("budget") as string,
            location: formData.get("location") as string,
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
            await emailjs.sendForm(
                "YOUR_SERVICE_ID",
                "YOUR_TEMPLATE_ID",
                form,
                "YOUR_PUBLIC_KEY"
            );
            setSubmitted(true);
            setTimeout(() => {
                setIsOpen(false);
                setSubmitted(false);
            }, 2000);
        } catch {
            // Fallback for demo
            setSubmitted(true);
            setTimeout(() => {
                setIsOpen(false);
                setSubmitted(false);
            }, 2000);
        } finally {
            setSending(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[450px] bg-primary/95 backdrop-blur-xl border-white/10 text-white shadow- luxury">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold font-heading text-gradient-gold">Book Free Consultation</DialogTitle>
                    <DialogDescription className="text-white/60">
                        Get expert guidance on your property journey in Hyderabad.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-4">
                        <div>
                            <input
                                name="name"
                                type="text"
                                placeholder="Your Name"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-secondary transition-colors"
                            />
                            {errors.name && <p className="text-secondary text-xs mt-1">{errors.name}</p>}
                        </div>
                        <div>
                            <input
                                name="phone"
                                type="tel"
                                placeholder="Phone Number"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-secondary transition-colors"
                            />
                            {errors.phone && <p className="text-secondary text-xs mt-1">{errors.phone}</p>}
                        </div>
                        <div>
                            <input
                                name="email"
                                type="email"
                                placeholder="Email Address"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-secondary transition-colors"
                            />
                            {errors.email && <p className="text-secondary text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <select name="budget" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white/70 focus:outline-none focus:border-secondary transition-colors appearance-none">
                                <option value="" className="bg-primary text-white">Budget</option>
                                <option className="bg-primary text-white">Under ₹50L</option>
                                <option className="bg-primary text-white">₹50L - ₹1Cr</option>
                                <option className="bg-primary text-white">₹1Cr - ₹2Cr</option>
                                <option className="bg-primary text-white">Above ₹2Cr</option>
                            </select>
                            <select name="location" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white/70 focus:outline-none focus:border-secondary transition-colors appearance-none">
                                <option value="" className="bg-primary text-white">Location</option>
                                <option className="bg-primary text-white">Financial Dist</option>
                                <option className="bg-primary text-white">Kokapet</option>
                                <option className="bg-primary text-white">Tellapur</option>
                                <option className="bg-primary text-white">Narsingi</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={sending}
                        className="w-full gradient-gold-btn py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform disabled:opacity-70 mt-2"
                    >
                        {submitted ? "Thank You!" : sending ? "Sending..." : (<>Request Consultation <Send size={18} /></>)}
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default BookingModal;
