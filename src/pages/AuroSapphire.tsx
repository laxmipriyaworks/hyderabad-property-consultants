
import { useEffect, useState, useRef } from "react";
import "./AuroSapphire.css";
import logo from "@/assets/auro-logo.jpg";
import emailjs from "@emailjs/browser";
import EnquiryPopup from "@/components/EnquiryPopup";
import { z } from "zod";

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Play,
} from "lucide-react";

const BLUE = "#0e3178";
const enquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z
    .string()
    .trim()
    .min(10, "Valid phone number required")
    .max(15, "Invalid phone number")
    .regex(/^[+\d\s()-]+$/, "Invalid phone number"),
  lookingFor: z.string().min(1, "Please select an option"),
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

const AuroSapphire = () => {
  const [scrolled, setScrolled] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof EnquiryFormData, string>>
  >({});

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      lookingFor: formData.get("lookingFor") as string,
    };

    const result = enquirySchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: Partial<
        Record<keyof EnquiryFormData, string>
      > = {};

      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof EnquiryFormData;
        fieldErrors[field] = err.message;
      });

      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setSending(true);

    try {
      await emailjs.sendForm(
        "service_hw9sdov",
        "template_d7q5lnd",
        formRef.current,
        "J48bsngWC4okx4cXt"
      );

      formRef.current.reset();
window.location.href = "/auro-sapphire/thank-you";

    } catch (error: any) {
  console.error("EmailJS Error:", error);

  alert(
    `EmailJS Error: ${error?.text || error?.message || JSON.stringify(error)}`
  );
} finally {
      setSending(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const galleryImages = [
    "/auro-sapphire/gallery-1.jpg",
    "/auro-sapphire/gallery-2.jpg",
    "/auro-sapphire/gallery-3.jpg",
  ];

  const nextGallery = () => {
    setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const previousGallery = () => {
    setGalleryIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  return (
    <div className="min-h-screen bg-white text-[#444]">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header
        className={`p-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-md"
            : "bg-white/95"
        }`}
      >
        <div className="max-w-[1450px] mx-auto px-4">
          <div className="h-[58px] flex items-center justify-between">

            {/* Logo / Brand */}
            <a
  href="#home"
  className="flex items-center shrink-0"
>
  <img
    src={logo}
    alt="Auro Sapphire Property"
    className="w-auto h-16 md:h-18"
  />
</a>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex items-center gap-5 text-[16px]">

              <a href="#overview" className="hover:text-[#66846a]">
                Overview
              </a>

              <a href="#configuration" className="hover:text-[#66846a]">
                Configuration
              </a>

              <a href="#amenities" className="hover:text-[#66846a]">
                Amenities
              </a>

              <a href="#plans" className="hover:text-[#66846a]">
                Plans
              </a>

              <a href="#connectivity" className="hover:text-[#66846a]">
                Connectivity
              </a>

              <a href="#developer" className="hover:text-[#66846a]">
                About The Developer
              </a>

            </nav>

            <button
              className="text-white text-[14px] px-5 py-2.5"
              style={{ backgroundColor: BLUE }}  type="button"
  onClick={() => setEnquiryOpen(true)}>
              
                Enquire Now
              
            </button>

          </div>
        </div>
      </header>


      {/* =====================================================
          HERO
      ====================================================== */}

      <section id="home" className="pt-[58px]">

        <div className="relative h-[420px] md:h-[540px] overflow-hidden">

          <img
            src="src/assets/auro1.jpg"
            alt="Auro Sapphire"
            className="w-full h-full object-cover"
          />

          {/* right enquiry */}
          <a
            className="absolute right-0 top-1/2 -translate-y-1/2 text-white text-[14px] px-2 py-5"
            style={{
              backgroundColor: BLUE,
              writingMode: "vertical-rl",
            }}
          type="button"
  onClick={() => setEnquiryOpen(true)}>
            ENQUIRE NOW
          </a>

        </div>

        {/* Property information card */}
        <div className="relative max-w-[750px] mx-5 px-5 Property-section">

          <div className="relative z-10 mx-5 md:mx-0 -mt-14 bg-white rounded-md shadow-lg p-5 md:p-6">

            <p className="text-[20px] text-gray-700">
              Auro Sapphire
            </p>

            <p className="text-[18px] text-gray-500 mt-1">
              Kondapur, Hyderabad
            </p>

            <div className="mt-5 grid md:grid-cols-2 gap-6 items-end">

              <div>
                <p className="font-bold text-xl text-gray-800">
                  3 & 4 BHK
                </p>

                <p className="text-[14px] text-gray-500">
                  Residences
                </p>
              </div>

              <div>
                <p className="font-bold text-xl text-gray-800">
                  2,281 - 3,286 sq. ft.
                </p>

                <p className="text-[14px] text-gray-500">
                  Expansive 3 & 4 BHK Residences
                </p>
              </div>

               <div className="mt-5 max-w-[750px] gap-0 items-end">
               <a
                type="button"
  onClick={() => setEnquiryOpen(true)}
                className="text-center text-white py-3 px-5 text-[14px]"
                style={{ backgroundColor: BLUE }}
              >
                ENQUIRE NOW
              </a>
              </div>

            </div>
<div>
 
</div>
          </div>

        </div>

      </section>


      {/* =====================================================
          OVERVIEW
      ====================================================== */}

      <section
        id="overview"
        className="py-20 px-5 md:px-10"
      >

        <div className="text-center mb-12">

          <h2
            className="text-lg md:text-xl font-light"
            style={{ color: BLUE }}
          >
            OVERVIEW
          </h2>

          <div
            className="w-10 h-px mx-auto mt-3"
            style={{ backgroundColor: BLUE }}
          />

        </div>

        <div className="max-w-[1050px] mx-auto grid md:grid-cols-2 gap-8 items-start">

          {/* PDF page 21 visual */}
          <img
            src="src/assets/auro2.jpg"
            alt="Auro Sapphire"
            className="w-full h-[450px] object-cover"
          />

          <div className="text-[14px] leading-6 text-gray-600">

            <h3 className="text-black font-semibold mb-4">
              GIVE YOUR WISHES A LIFELONG ADDRESS.
            </h3>

            <p>
              At SAPPHIRE every detail begins with a wish—for
              space that breathes, views that calm, and a life
              that feels effortlessly elevated.
            </p>

            <p className="mt-4">
              Designed across 8.01 acres with only four soaring
              towers, this is where aspiration meets arrival.
            </p>

            <div className="mt-6 space-y-2">

              <p>
                <strong>Iconic G+47 Towers</strong> in 8.01 Acres
              </p>

              <p>
                <strong>Low-Density Living</strong> (1296 homes in
                8.01 acres)
              </p>

              <p>
                <strong>Residence-free Ground Floor</strong>
              </p>

              <p>
                <strong>
                  Expansive 3 & 4 BHK Residences
                </strong>{" "}
                (2269-3286 with extended balconies)
              </p>

              <p>
                <strong>
                  Grand 60,000+ Sq. Ft. 4 Level Clubhouse
                </strong>
              </p>

              <p>
                <strong>
                  2,35,000+ sq. ft. of Recreational Amenities
                </strong>
              </p>

              <p>
                <strong>
                  44,000+ sq. ft. Stilt-level Amenities
                </strong>
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          DOWNLOADS
      ====================================================== */}

      <section className="py-16 bg-[#fafaf7] px-5">

        <div className="text-center mb-10">

          <h2 
            className="text-lg md:text-xl font-light"
            style={{ color: BLUE }}
          >
            DOWNLOADS
          </h2>

          <div
            className="w-10 h-px mx-auto mt-3"
            style={{ backgroundColor: BLUE }}
          />

        </div>

        <div className="max-w-[850px] mx-auto grid md:grid-cols-3 gap-5">

          <DownloadCard 
            title="Brochure"
            onClick={() => setEnquiryOpen(true)}
          />

          <DownloadCard
            title="Floor Plan"
             onClick={() => setEnquiryOpen(true)}
          />

          <DownloadCard
            title="Site Plan"
             onClick={() => setEnquiryOpen(true)}
          />

        </div>

      </section>


      {/* =====================================================
          CONFIGURATION
      ====================================================== */}

      <section
        id="configuration"
        className="py-20 px-5 bg-[#f7f7f2]"
      >

        <div className="max-w-[850px] mx-auto grid md:grid-cols-2 gap-6">

          <ConfigurationCard
            title="3 BHK"
            details={[
              "2281 sq. ft.",
              "2408 sq. ft.",
              "2409 sq. ft.",
              "2599 sq. ft.",
            ]}
            description="Expansive 3 BHK residences"
            onEnquire={() => setEnquiryOpen(true)}
          />

          <ConfigurationCard
            title="3 & 4 BHK"
            details={[
              "2865 sq. ft.",
              "3286 sq. ft.",
            ]}
            description="Premium 3 & 4 BHK residences"
            onEnquire={() => setEnquiryOpen(true)}
          />

        </div>

      </section>


      {/* =====================================================
          REASONS TO MAKE SAPPHIRE YOUR HOME
      ====================================================== */}

      <section className="py-20 px-5">

        <div className="max-w-[1000px] mx-auto grid md:grid-cols-2 gap-10 items-center">

          <img
            src="src/assets/auro3.png"
            alt="Reasons to make Sapphire your home"
            className="w-full"
          />

          <div>

            <SectionTitle>
              REASONS TO MAKE SAPPHIRE YOUR HOME
            </SectionTitle>

            <div className="space-y-6 text-[14px] leading-6 text-gray-600">

              <div>
                <h3 className="font-semibold text-gray-800">
                  CONNECTIVITY
                </h3>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">
                  BLUE SPACES & LAKE
                </h3>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">
                  STRATEGIC LOCATION
                </h3>

                <p>
                  Located in Prime Location Kondapur, Opp HCU
                </p>

                <p className="mt-2">
                  well connected, BLUEery, open on all sides,
                  lake-view, away from concrete jungle,
                  pollution free
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FOUR ICONS OF LIFE / TOWERS
      ====================================================== */}

      <section className="py-20 bg-[#fafaf7] px-5">

        <div className="max-w-[1050px] mx-auto">

          <SectionTitle>
            FOUR ICONS OF LIFE
          </SectionTitle>

          <p className="text-center text-[14px] leading-6 text-gray-600 max-w-[800px] mx-auto mb-12">
            Every tower at Sapphire offers a distinct way of
            living, thoughtfully designed around spacious
            residences, exceptional views, and refined
            experiences. While each has its own defining
            character, together they create a landmark address
            where every home reflects a different aspiration.
          </p>

          <div className="grid md:grid-cols-2 gap-6">

            <TowerCard 
              title="TOWER ARENA"
              subtitle="WISHFUL GRANDE LIVING"
              text="Expansive 3 BHK residences in 2281, 2408 and 2409 sq. ft., thoughtfully positioned to capture lush BLUEery and sweeping city views."
           
            />

            <TowerCard
              title="TOWER ELITE"
              subtitle="LUXE LAKEVIEW LIVING"
              text="Exclusive 3 BHK residences in a single spacious configuration of 2599 sq. ft., overlooking the serene 53-acre Gopi Cheruvu lake."
            />

            <TowerCard
              title="TOWER SUMMIT"
              subtitle="WISHFUL GRANDE LIVING"
              text="Well-appointed 3 BHK residences in 2281, 2408 and 2409 sq. ft., offering panoramic BLUEery and vibrant cityscapes."
            />

            <TowerCard
              title="TOWER CROWN"
              subtitle="MIGHTY SKYLINE LIVING"
              text="Premium 3 & 4 BHK residences in 2865, 3286 and 3286 sq. ft., complemented by exclusive clubhouse and cityscape views."
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          LUXURY LIVING EXPERIENCE
      ====================================================== */}

      <section className="py-20 px-5">

        <div className="max-w-[1100px] mx-auto">

          <SectionTitle>
            LUXURY LIVING EXPERIENCE
          </SectionTitle>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-10">

            <FeatureBox text="HIGH RISE LIVING" />

            <FeatureBox text="CORNER FLATS" />

            <FeatureBox text="SPACIOUS CORRIDORS" />

            <FeatureBox text="UNINTERRUPTED VIEWS" />

            <FeatureBox text="VAASTU COMPLIANT" />

          </div>

        </div>

      </section>


      {/* =====================================================
          SWIMMING POOL
      ====================================================== */}

   


      {/* =====================================================
          SCAPE AMENITIES
      ====================================================== */}

      <section id="amenities" className="py-20 bg-[#fafaf7] px-5">
         
        <div className="max-w-[1100px] mx-auto">

          <SectionTitle>
            SCAPE AMENITIES
          </SectionTitle>

          <p className="text-center text-[14px] text-gray-600 mb-10">
            A LANDSCAPE DESIGNED TO SLOW LIFE DOWN
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            <AmenityImage
              image="src/assets/amen-1.jpg"
              label="Multipurpose Court with Seating"
            />

            <AmenityImage
              image="src/assets/amen-2.jpg"
              label="Cricket Pitch"
            />

            <AmenityImage
              image="src/assets/amen-3.jpg"
              label="Adventure Zone + Skating Rink"
            />

            <AmenityImage
              image="src/assets/amen-4.jpg"
              label="Sand Pit"
            />

            <AmenityImage
              image="src/assets/amen-5.jpg"
              label="Kids Play Area"
            />

            <AmenityImage
              image="src/assets/amen-6.jpg"
              label="Pet Park"
            />

            <AmenityImage
              image="src/assets/amen-7.jpg"
              label="Open Gym"
            />

            <AmenityImage
              image="src/assets/amen-8.jpg"
              label="Jogging Track"
            />

          </div>

        </div>

      </section>



  {/* =====================================================
          ENQUIRY BAR
      ====================================================== */}

<section
  id="enquiry"
  className="py-7 px-5 text-white"
  style={{ backgroundColor: BLUE }}
>
  <div className="max-w-[1150px] mx-auto">
  <h2 className="text-center text-2xl md:text-3xl font-semibold mb-6">
      Enquiry Form
    </h2>
    <form
      ref={formRef}
      onSubmit={handleEnquirySubmit}
      className="grid md:grid-cols-4 gap-3"
    >

      {/* Name */}
      <div>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full bg-white text-black px-4 py-3 text-[16px] outline-none"
        />

        {errors.name && (
          <p className="text-white text-sm mt-1">
            {errors.name}
          </p>
        )}
      </div>

      {/* Mobile Number */}
      <div>
        <input
          type="tel"
          name="phone"
          placeholder="Mobile Number"
          className="w-full bg-white text-black px-4 py-3 text-[16px] outline-none"
        />

        {errors.phone && (
          <p className="text-white text-sm mt-1">
            {errors.phone}
          </p>
        )}
      </div>

      {/* Looking For */}
      <div>
        <select
          name="lookingFor"
          defaultValue=""
          className="w-full bg-white text-black px-4 py-3 text-[16px] outline-none"
        >
          <option value="" disabled>
            Looking for
          </option>
          <option value="3bhk">3 BHK</option>
          <option value="4bhk">4 BHK</option>
        </select>

        {errors.lookingFor && (
          <p className="text-white text-sm mt-1">
            {errors.lookingFor}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={sending}
        className="bg-white text-[#66846a] py-3 text-[16px] font-semibold disabled:opacity-60"
      >
        {submitted
          ? "Submitted!"
          : sending
          ? "Submitting..."
          : "SUBMIT"}
      </button>

    </form>
{submitted && (
  <p className="text-center text-white text-[16px] font-semibold mt-4">
    Thank you! Your enquiry has been submitted successfully.
  </p>
)}
  </div>
</section>
      {/* =====================================================
          PLANS
      ====================================================== */}

      <section
        id="plans"
        className="py-20 px-5"
      >

        <div className="max-w-[800px] mx-auto">

          <SectionTitle>
            PLANS
          </SectionTitle>

          <div className="flex justify-center gap-8 text-[14px] mt-4 mb-10">

            <a href="#master-plan"><span
              className="font-semibold"
              style={{ color: BLUE }}
            >
              MASTER PLAN
            </span></a>

            <a href="#floor-plan"><span className="text-gray-400">
              FLOOR PLAN
            </span></a>

          </div>

          <div
            id="master-plan"
            className="border border-gray-200 bg-white"
          >

            <img
              src="src/assets/master-plans.png"
              alt="Auro Sapphire Master Plan"
              className="w-full"
            />

          </div>

           <div
            id="floor-plan"
            className="mt-5 border border-gray-200 bg-white"
          >

            <img
              src="src/assets/floor-plans.png"
              alt="Auro Sapphire Master Plan"
              className="w-full"
            />

          </div>
          

        </div>

      </section>


      {/* =====================================================
          CONNECTIVITY
      ====================================================== */}

      <section
        id="connectivity"
        className="py-20 bg-[#f7f7f2] px-5"
      >

        <div className="max-w-[1100px] mx-auto">

          <SectionTitle>
            CONNECTIVITY
          </SectionTitle>

          <p className="text-center text-[16px] text-gray-600 mb-10">
            WHERE YOUR WISH MEETS ITS ADDRESS.
          </p>

          <div className="grid md:grid-cols-2 gap-8">

            <img
              src="src/assets/auro12.jpg"
              alt="Auro Sapphire Location"
              className="w-full"
            />

            <div className="grid grid-cols-2 gap-x-6 gap-y-7 text-[16px]">

              <LocationGroup
                title="CONNECTIVITY"
                items={[
                  "Chandanagar Railway Station — 7 mins",
                  "Lingampally Railway Station — 10 mins",
                  "Gachibowli ORR — 14 mins",
                  "Rajiv Gandhi Int Airport — 40 mins",
                ]}
              />

              <LocationGroup
                title="EDUCATION"
                items={[
                  "Chirec International School — 2 mins",
                  "Euro Kids School — 2 mins",
                  "Hyderabad Central University — 4 mins",
                  "IIIT Gachibowli — 7 mins",
                  "ISB Hyderabad — 9 mins",
                ]}
              />

              <LocationGroup
                title="CORPORATES"
                items={[
                  "TCS — 9 mins",
                  "Synergy Park — 9 mins",
                  "Microsoft — 11 mins",
                  "DIF — 13 mins",
                  "Google — 13 mins",
                  "Deloitte",
                ]}
              />

              <LocationGroup
                title="MALLS"
                items={[
                  "S M R Terminus — 11 mins",
                  "Sarath City Mall — 12 mins",
                  "GSM Mall — 15 mins",
                  "Inorbit Mall — 20 mins",
                ]}
              />

              <LocationGroup
                title="HOSPITALS"
                items={[
                  "Vanaja Maternity — 10 mins",
                  "Gleneagles Hospital — 11 mins",
                  "KIMS — 13 mins",
                  "ANG Hospitals — 15 mins",
                ]}
              />
              <LocationGroup
                title="BANKS"
                items={[
                  "ICICI Bank — 2 mins",
                  "HDFC Bank — 2 mins",
                ]}
              />

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          OUR MAJOR USPs
      ====================================================== */}

      <section className="py-20 px-5">

        <div className="max-w-[1000px] mx-auto">

          <SectionTitle>
            OUR MAJOR USPs
          </SectionTitle>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-12">

            <FeatureBox text="RESIDENCES" />

            <FeatureBox text="FREE LOCATION" />

            <FeatureBox text="80% OPEN SPACES" />

            <FeatureBox text="GROUND FLOOR" />

            <FeatureBox text="360° VIEWS" />

            <FeatureBox text="HEIGHT OF THE TOWER" />

          </div>

        </div>

      </section>


      {/* =====================================================
          ABOUT DEVELOPER
      ====================================================== */}

      <section
        id="developer"
        className="py-20 bg-[#fafaf7] px-5"
      >

        <div className="max-w-[1000px] mx-auto">

          <SectionTitle>
            ABOUT AURO REALTY
          </SectionTitle>

          <div className="grid md:grid-cols-2 gap-10 mt-10">

            <img
              src="/src/assets/about-bg.jpg"
              alt="Auro Realty"
              className="w-full"
            />

            <div className="text-[14px] leading-7 text-gray-600">

              <p>
                Auro Realty is India's fastest-growing real estate
                company.
              </p>

              <p className="mt-4">
                Globally benchmarked technology and innovation to
                deliver the highest quality of luxurious residential
                and commercial spaces.
              </p>

              <p className="mt-4">
                Auro believes in world-class sustainable development
                with cutting-edge technology and On-time delivery.
              </p>

              <p className="mt-4">
                Focused on creating India's most premium real estate
                brand.
              </p>

              <p className="mt-4">
                Consistent emphasis on cash flow stability.
              </p>

              <p className="mt-4">
                Amongst the best and most experienced management team
                with proven track record.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          ENQUIRY BAR
      ====================================================== */}

<section
  id="enquiry"
  className="py-7 px-5 text-white"
  style={{ backgroundColor: BLUE }}
>
  <div className="max-w-[1150px] mx-auto">
  <h2 className="text-center text-2xl md:text-3xl font-semibold mb-6">
      Enquiry Form
    </h2>
    <form
      ref={formRef}
      onSubmit={handleEnquirySubmit}
      className="grid md:grid-cols-4 gap-3"
    >

      {/* Name */}
      <div>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full bg-white text-black px-4 py-3 text-[16px] outline-none"
        />

        {errors.name && (
          <p className="text-white text-sm mt-1">
            {errors.name}
          </p>
        )}
      </div>

      {/* Mobile Number */}
      <div>
        <input
          type="tel"
          name="phone"
          placeholder="Mobile Number"
          className="w-full bg-white text-black px-4 py-3 text-[16px] outline-none"
        />

        {errors.phone && (
          <p className="text-white text-sm mt-1">
            {errors.phone}
          </p>
        )}
      </div>

      {/* Looking For */}
      <div>
        <select
          name="lookingFor"
          defaultValue=""
          className="w-full bg-white text-black px-4 py-3 text-[16px] outline-none"
        >
          <option value="" disabled>
            Looking for
          </option>
          <option value="3bhk">3 BHK</option>
          <option value="4bhk">4 BHK</option>
        </select>

        {errors.lookingFor && (
          <p className="text-white text-sm mt-1">
            {errors.lookingFor}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={sending}
        className="bg-white text-[#66846a] py-3 text-[16px] font-semibold disabled:opacity-60"
      >
        {submitted
          ? "Submitted!"
          : sending
          ? "Submitting..."
          : "SUBMIT"}
      </button>

    </form>
{submitted && (
  <p className="text-center text-white text-[16px] font-semibold mt-4">
    Thank you! Your enquiry has been submitted successfully.
  </p>
)}
  </div>
</section>
{/* =====================================================
    AURO SAPPHIRE FOOTER
====================================================== */}

<footer className="bg-[#f8f8f5] border-t border-gray-200">

  <div className="max-w-[1150px] mx-auto px-5 py-12">

    <div className="grid md:grid-cols-3 gap-10 items-start">

      {/* Logo */}
      <div>
        <img
          src={logo}
          alt="Auro Sapphire"
          className="h-16 md:h-20 w-auto"
        />

        <p className="text-[14px] text-gray-500 mt-4 leading-6">
          SAPPHIRE BY AURO REALTY
        </p>

        <p className="text-[13px] text-gray-400 mt-1">
          formerly known as Aurobindo Realty
        </p>
      </div>


      {/* Quick Links */}
      <div>

        <h3
          className="text-[15px] font-semibold mb-4"
          style={{ color: BLUE }}
        >
          QUICK LINKS
        </h3>

        <div className="space-y-2 text-[14px] text-gray-500">

          <a
            href="#home"
            className="block hover:text-[#66846a] transition-colors"
          >
            Home
          </a>

          <a
            href="#overview"
            className="block hover:text-[#66846a] transition-colors"
          >
            Overview
          </a>

          <a
            href="#configuration"
            className="block hover:text-[#66846a] transition-colors"
          >
            Configuration
          </a>

          <a
            href="#amenities"
            className="block hover:text-[#66846a] transition-colors"
          >
            Amenities
          </a>

          <a
            href="#plans"
            className="block hover:text-[#66846a] transition-colors"
          >
            Plans
          </a>

          <a
            href="#connectivity"
            className="block hover:text-[#66846a] transition-colors"
          >
            Connectivity
          </a>

        </div>

      </div>


      {/* Contact */}
      <div>

        <h3
          className="text-[15px] font-semibold mb-4"
          style={{ color: BLUE }}
        >
          CONTACT
        </h3>

        <div className="space-y-3 text-[14px] text-gray-500">

          <a
            href="tel:+916281245149"
            className="block hover:text-[#66846a] transition-colors"
          >
            +91 6281245149
          </a>

        </div>

      </div>

    </div>


    {/* Bottom */}
    <div className="border-t border-gray-200 mt-10 pt-6 text-center">

      <p className="text-[13px] text-gray-400">
        SAPPHIRE BY AURO REALTY
      </p>

      <p className="text-[12px] text-gray-400 mt-2">
        formerly known as Aurobindo Realty
      </p>

    </div>

  </div>

</footer>

{/* ENQUIRY POPUP */}
<EnquiryPopup
  isOpen={enquiryOpen}
  onClose={() => setEnquiryOpen(false)}
/>

    </div>
  );
};


/* =========================================================
   COMPONENTS
========================================================= */

const SectionTitle = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="text-center mb-10">

      <h2
        className="text-lg md:text-xl font-light tracking-wide"
        style={{ color: BLUE }}
      >
        {children}
      </h2>

      <div
        className="w-10 h-px mx-auto mt-3"
        style={{ backgroundColor: BLUE }}
      />

    </div>
  );
};


const DownloadCard = ({
  title,
  onClick,
}: {
  title: string;
  onClick: () => void;
}) => {
  return (
    <a
      type="button"
      onClick={onClick}
      className="border border-[#b8c5b8] bg-white p-8 text-center hover:shadow-md transition-shadow"
    >

      <div className="text-3xl mb-5 opacity-60">
        ▧
      </div>

      <h3 className="text-[14px] font-semibold">
        {title}
      </h3>

      <div
        className="inline-block mt-5 px-6 py-2 text-white text-[14px]"
        style={{ backgroundColor: BLUE }}
      >
        DOWNLOAD
      </div>

    </a>
  );
};


const ConfigurationCard = ({
  title,
  details,
  description,
  onEnquire,
}: {
  title: string;
  details: string[];
  description: string;
  onEnquire: () => void;
}) => {
  return (
    <div className="bg-white border border-[#b8c5b8] p-8 text-center">

      <h3
        className="text-lg font-semibold"
        style={{ color: BLUE }}
      >
        {title}
      </h3>

      <p className="text-[14px] text-gray-500 mt-2">
        {description}
      </p>

      <div className="mt-5 space-y-1">

        {details.map((item) => (
          <p
            key={item}
            className="text-[16px] text-gray-600"
          >
            {item}
          </p>
        ))}

      </div>

      <button
  type="button"
  onClick={onEnquire}
  className="inline-block mt-6 text-white px-6 py-2 text-[14px]"
  style={{ backgroundColor: BLUE }}
>
  ENQUIRE NOW
</button>

    </div>
  );
};


const TowerCard = ({
  title,
  subtitle,
  text,
}: {
  title: string;
  subtitle: string;
  text: string;
}) => {
  return (
    <div className="bg-white border border-gray-200 p-7">

      <h3
        className="text-sm font-semibold"
        style={{ color: BLUE }}
      >
        {title}
      </h3>

      <h4 className="text-[16px] font-semibold mt-2">
        {subtitle}
      </h4>

      <p className="text-[16px] leading-6 text-gray-600 mt-4">
        {text}
      </p>

    </div>
  );
};


const FeatureBox = ({
  text,
}: {
  text: string;
}) => {
  return (
    <div
      className="min-h-[90px] border border-[#b8c5b8] flex items-center justify-center text-center p-5"
    >
      <span
        className="text-[14px] tracking-wide"
        style={{ color: BLUE }}
      >
        {text}
      </span>
    </div>
  );
};


const AmenityFloor = ({
  title,
  heading,
  items,
  image,
}: {
  title: string;
  heading: string;
  items: string[];
  image: string;
}) => {
  return (
    <div className="bg-white">

      <img
        src={image}
        alt={title}
        className="w-full h-[260px] object-cover"
      />

      <div className="p-6">

        <p
          className="text-[14px] font-semibold"
          style={{ color: BLUE }}
        >
          {title}
        </p>

        <h3 className="text-sm font-semibold mt-2">
          {heading}
        </h3>

        <div className="mt-5 space-y-2">

          {items.map((item) => (
            <p
              key={item}
              className="text-[16px] text-gray-600"
            >
              {item}
            </p>
          ))}

        </div>

      </div>

    </div>
  );
};


const AmenityImage = ({
  image,
  label,
}: {
  image: string;
  label: string;
}) => {
  return (
    <div className="bg-white">

      <img
        src={image}
        alt={label}
        className="w-full h-[180px] object-cover"
      />

      <p className="text-[14px] text-center py-3">
        {label}
      </p>

    </div>
  );
};


const LocationGroup = ({
  title,
  items,
}: {
  title: string;
  items: string[];
}) => {
  return (
    <div>

      <h3
        className="font-semibold text-[16px] mb-3"
        style={{ color: BLUE }}
      >
        {title}
      </h3>

      <div className="space-y-2">

        {items.map((item) => (
          <p
            key={item}
            className="text-[14px] leading-4 text-gray-600"
          >
            {item}
          </p>
        ))}

      </div>

    </div>
  );
};


const PlanImage = ({
  title,
  image,
}: {
  title: string;
  image: string;
}) => {
  return (
    <div className="bg-white border border-gray-200">

      <img
        src={image}
        alt={title}
        className="w-full"
      />

      <div
        className="py-3 text-center text-white text-[16px]"
        style={{ backgroundColor: BLUE }}
      >
        {title}
      </div>

    </div>
  );
};


export default AuroSapphire;