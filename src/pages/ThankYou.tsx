import { Link } from "react-router-dom";
import logo from "@/assets/auro-logo.jpg";

const ThankYou = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="text-center max-w-xl">
        <img
          src={logo}
          alt="Auro Sapphire"
          className="w-40 mx-auto mb-8"
        />

        <div className="text-5xl mb-6">✓</div>

        <h1 className="text-3xl md:text-4xl font-semibold mb-4">
          Thank You!
        </h1>

        <p className="text-gray-600 text-lg leading-relaxed mb-8">
          Thank you for your enquiry. Our team will get in touch with you shortly.
        </p>

        <Link
          to="/auro-sapphire"
          className="inline-block px-8 py-3 text-white text-sm font-semibold"
          style={{ backgroundColor: "#0e3178" }}
        >
          BACK TO AURO SAPPHIRE
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;