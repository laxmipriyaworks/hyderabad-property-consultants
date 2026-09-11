import { useState } from "react";
import emailjs from "@emailjs/browser";
import { X } from "lucide-react";
import { z } from "zod";

interface EnquiryPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name")
    .max(100, "Name is too long"),

  phone: z
    .string()
    .trim()
    .min(10, "Please enter a valid mobile number")
    .max(15, "Mobile number is too long")
    .regex(/^[+\d\s()-]+$/, "Please enter a valid mobile number"),

  lookingFor: z
    .string()
    .min(1, "Please select 3 BHK or 4 BHK"),
});

const EnquiryPopup = ({
  isOpen,
  onClose,
}: EnquiryPopupProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [lookingFor, setLookingFor] = useState("");

  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    lookingFor?: string;
  }>({});

  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = enquirySchema.safeParse({
      name,
      phone,
      lookingFor,
    });

    if (!result.success) {
      const newErrors: typeof errors = {};

      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof typeof newErrors;
        newErrors[field] = error.message;
      });

      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSending(true);

    try {
      await emailjs.send(
        "service_hw9sdov",
        "template_d7q5lnd",
        {
          name: name,
          phone: phone,
          lookingFor: lookingFor,
        },
        "J48bsngWC4okx4cXt"
      );
window.location.href = "/auro-sapphire/thank-you";
      setSuccess(true);

      setName("");
      setPhone("");
      setLookingFor("");

      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);

    } catch (error) {
      console.error("EmailJS Error:", error);

      alert("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-5"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white p-6 md:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Heading */}
        <div className="mb-6 pr-8">
          <h2 className="text-2xl font-semibold text-[#1a1a1a]">
            Enquire Now
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Please share your details
          </p>
        </div>

        {/* Success Message */}
        {success ? (
          <div className="py-10 text-center">
            <div className="mb-3 text-2xl font-semibold text-[#66846a]">
              Thank You!
            </div>

            <p className="text-gray-600">
              Your enquiry has been submitted successfully.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {/* Your Name */}
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full border border-gray-300 bg-white px-4 py-3 text-[16px] text-black outline-none focus:border-[#66846a]"
              />

              {errors.name && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Mobile Number"
                className="w-full border border-gray-300 bg-white px-4 py-3 text-[16px] text-black outline-none focus:border-[#66846a]"
              />

              {errors.phone && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Looking For */}
            <div>
              <select
                value={lookingFor}
                onChange={(e) => setLookingFor(e.target.value)}
                className="w-full border border-gray-300 bg-white px-4 py-3 text-[16px] text-black outline-none focus:border-[#66846a]"
              >
                <option value="" disabled>
                  Looking For
                </option>

                <option value="3 BHK">
                  3 BHK
                </option>

                <option value="4 BHK">
                  4 BHK
                </option>
              </select>

              {errors.lookingFor && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.lookingFor}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={sending}
              className="w-full bg-[#66846a] py-3 text-[16px] font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? "Submitting..." : "SUBMIT"}
            </button>

          </form>
        )}

      </div>
    </div>
  );
};

export default EnquiryPopup;