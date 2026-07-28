import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  FaLightbulb,
  FaHandshake,
  FaStar,
  FaChalkboardTeacher,
  FaBookOpen,
  FaUsers,
  FaAward,
  FaRocket,
  FaBullseye,
  FaCheckCircle,
} from "react-icons/fa";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>About PV Classes | Best Coaching Institute</title>
        <meta
          name="description"
          content="Learn about PV Classes - our mission, values, and dedicated team of educators"
        />
      </Head>

      {/* Enhanced Hero Section with Education Theme */}
      <section
        className="relative py-20 text-white overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/Image/Banner/about-banner.png')",
        }}
      >
        <div className="container relative mx-auto px-6 text-center">
          <div className="inline-block p-3 bg-white/10 rounded-full backdrop-blur-sm mb-6">
            <FaBookOpen className="text-3xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            About <span className="text-yellow-300">PV Classes</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Shaping the future of education with innovation, excellence, and
            trust since 2019.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[150px]">
              <div className="text-2xl font-bold">India-wide</div>
              <div className="text-sm">Learning Community</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[150px]">
              <div className="text-2xl font-bold">7+ Years</div>
              <div className="text-sm">Education Experience</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[150px]">
              <div className="text-2xl font-bold">1M+</div>
              <div className="text-sm">Vision 2030 Learners</div>
            </div>
          </div>
        </div>
      </section>

      {/* About PV Classes */}
      <section className="relative py-20 px-6 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#eef5fb] to-transparent" />
        <div className="container relative mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 text-[#13773E] text-sm font-bold uppercase tracking-[0.18em] mb-5">
                <FaBookOpen />
                About PV Classes
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#173f67] leading-tight mb-6">
                More than preparation.
                <span className="block text-[#13773E]">
                  A pathway to success.
                </span>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                PV Classes is a mission-driven learning platform transforming
                competitive-exam preparation through quality education,
                innovation, affordability, and trusted mentorship.
              </p>
              <p className="text-gray-600 leading-relaxed max-w-3xl">
                Since 2019, we have combined experienced educators, reliable
                resources, structured assessment, and modern technology so
                every learner—from a major city to a remote village—can
                prepare with confidence.
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {[
                ["2019", "Our journey began"],
                ["Pan-India", "Learning access"],
                ["7+ Years", "Education experience"],
                ["1M+", "Vision 2030 learners"],
              ].map(([value, label], index) => (
                <div
                  key={label}
                  className={`rounded-2xl p-6 border ${
                    index === 0
                      ? "bg-[#204972] text-white border-[#204972]"
                      : "bg-white text-[#204972] border-[#214B7D]/10 shadow-sm"
                  }`}
                >
                  <div
                    className={`text-2xl md:text-3xl font-extrabold ${
                      index === 0 ? "text-[#C8D42E]" : "text-[#13773E]"
                    }`}
                  >
                    {value}
                  </div>
                  <div
                    className={`text-sm mt-2 ${
                      index === 0 ? "text-white/65" : "text-gray-500"
                    }`}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-10 pt-8 border-t border-gray-100">
            {[
              "Live & Recorded Classes",
              "Books & Notes",
              "Test Series",
              "AI Mock Interviews",
              "Expert Mentorship",
            ].map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full bg-[#eef5fb] border border-[#214B7D]/10 px-4 py-2 text-sm font-semibold text-[#204972]"
              >
                <FaCheckCircle className="text-[#13773E]" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose PV Classes */}
      <section className="relative py-20 px-6 bg-[#0d3156] text-white overflow-hidden">
        <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full border-[60px] border-white/[0.03]" />
        <div className="absolute -left-24 -bottom-32 w-80 h-80 rounded-full bg-[#13773E]/30 blur-3xl" />
        <div className="container relative mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-8 items-end mb-12">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 text-[#C8D42E] text-sm font-bold uppercase tracking-[0.18em] mb-5">
                <FaAward />
                Why Choose PV Classes?
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
                Built around the learner,
                <span className="block text-[#acd0f3]">at every step.</span>
              </h2>
            </div>
            <p className="lg:col-span-5 text-white/65 leading-relaxed lg:border-l border-white/20 lg:pl-6">
              Practical, accessible, and result-oriented learning with support
              throughout your preparation journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              ["01", "Trusted Academics", "Experienced faculty, updated content, and examination-focused resources."],
              ["02", "Smarter Preparation", "Test series, analytics, AI tools, and practical interview training."],
              ["03", "Support That Stays", "Personal mentorship, doubt resolution, and continuous student support."],
              ["04", "Accessible by Design", "Affordable programs on a secure nationwide digital learning platform."],
            ].map(([number, title, description]) => (
              <article
                key={number}
                className="group rounded-2xl bg-white/[0.07] border border-white/10 p-6 min-h-60 hover:-translate-y-2 hover:bg-white transition-all duration-500"
              >
                <span className="text-sm font-black text-[#C8D42E]">
                  {number}
                </span>
                <h3 className="text-xl font-bold mt-8 mb-3 group-hover:text-[#204972] transition-colors">
                  {title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed group-hover:text-gray-600 transition-colors">
                  {description}
                </p>
                <div className="w-10 h-1 rounded-full bg-[#C8D42E] mt-7 transition-all duration-500 group-hover:w-full" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section with Image */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 order-2 md:order-1">
              <div className="relative">
                <div className="relative h-80 w-full rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="/Image/Banner/councelling.png"
                    alt="About Banner"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#5C6417] opacity-20 rounded-full -z-10"></div>
              </div>
            </div>
            <div className="md:w-1/2 order-1 md:order-2">
              <div className="inline-flex items-center gap-2 bg-[#214B7D]/10 text-[#214B7D] px-4 py-2 rounded-full mb-4">
                <FaAward className="text-lg" />
                <span className="font-semibold">Our Commitment</span>
              </div>
              <h2 className="text-3xl font-bold text-[#204972] mb-6">
                Our <span className="text-[#5C6417]">Mission</span>
              </h2>
              <p className="text-gray-700 mb-4 text-lg">
                To transform learning into success through accessible,
                affordable, high-quality education and expert mentorship.
              </p>
              <p className="text-gray-700 mb-6">
                PV Classes bridges traditional education and modern technology
                so learners in metropolitan cities and remote villages can
                prepare with equal confidence, clarity, and opportunity.
              </p>
              <ul className="space-y-3">
                {[
                  "Quality education from experienced educators",
                  "Affordable, accessible competitive-exam preparation",
                  "Reliable books, notes, and learning resources",
                  "AI-enabled learning, mentorship, and career guidance",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="bg-[#13773E] text-white p-1 rounded-full mt-1">
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About Story & Learning Ecosystem */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-10 items-start">
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 bg-[#214B7D]/10 text-[#214B7D] px-4 py-2 rounded-full mb-5">
                <FaRocket />
                <span className="font-semibold">More Than a Platform</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#204972] leading-tight mb-6">
                A mission to transform how India prepares
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                PV Classes is built on quality education, innovation,
                affordability, and student success. We combine expert guidance,
                structured learning, continuous assessment, and dependable
                resources in one complete preparation ecosystem.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Every course is designed by experienced educators for
                conceptual clarity, practical understanding, and focused
                examination preparation.
              </p>
            </div>

            <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
              {[
                ["Live & Recorded Learning", "Interactive classes and flexible recorded courses for learning from anywhere."],
                ["Books & Study Resources", "Printed publications, premium notes, and previous-year question banks."],
                ["Assessment & Analytics", "Topic-wise tests, full-length series, and performance-driven preparation."],
                ["AI-Powered Preparation", "Mock interviews, instant feedback, and intelligent learning support."],
                ["Expert Mentorship", "Doubt resolution, career guidance, and personalized preparation strategies."],
                ["Future-Ready Technology", "A secure digital platform and smart dashboard built for modern learners."],
              ].map(([title, description], index) => (
                <div
                  key={title}
                  className={`rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    index % 2 === 0
                      ? "bg-blue-50/70 border-blue-100"
                      : "bg-lime-50/70 border-lime-100"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#214B7D] to-[#13773E] text-white flex items-center justify-center mb-4">
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-[#204972] mb-2">{title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#eef5fb] to-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 bg-white text-[#13773E] px-4 py-2 rounded-full shadow-sm mb-4">
              <FaBookOpen />
              <span className="font-semibold">Our Journey</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#204972] mb-4">
              Building Excellence Since 2019
            </h2>
            <p className="text-gray-600">
              From personalized classroom coaching to a nationwide,
              technology-powered learning ecosystem.
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-[#214B7D] via-[#13773E] to-[#5C6417]" />
            <div className="space-y-6">
              {[
                ["2019", "The Beginning", "Founded to provide quality guidance for teaching and competitive examinations through offline coaching and personal mentorship."],
                ["2020", "Expanding Our Reach", "Introduced structured study materials and comprehensive classroom programs, guiding hundreds of aspirants."],
                ["2021", "Digital Transformation", "Launched live interactive online classes and opened access to expert faculty for students across India."],
                ["2022", "Quality Content & Publications", "Published examination-oriented books, notes, and study resources with a strong focus on conceptual learning."],
                ["2023", "Student-Centric Innovation", "Added advanced test series, performance analysis, and personalized preparation strategies."],
                ["2024", "Technology-Driven Learning", "Strengthened digital infrastructure, analytics, smart support, and nationwide accessibility."],
                ["2025", "AI-Powered Education", "Introduced AI mock interviews, intelligent learning tools, and instant performance feedback."],
                ["2026", "India’s Future in Special Education", "Expanded into a complete ecosystem of courses, books, AI solutions, and mentorship for Special Educator preparation."],
              ].map(([year, title, description], index) => (
                <div
                  key={year}
                  className={`journey-card relative md:w-1/2 ${
                    index % 2 === 0
                      ? "journey-card-left md:pr-10 md:text-right"
                      : "journey-card-right md:ml-auto md:pl-10"
                  }`}
                >
                  <div
                    className={`journey-marker hidden md:block absolute top-7 w-4 h-4 rounded-full bg-[#C8D42E] border-4 border-white shadow ${
                      index % 2 === 0 ? "-right-2" : "-left-2"
                    }`}
                  />
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                    <span className="inline-block text-sm font-extrabold tracking-wider text-[#13773E] mb-2">
                      {year}
                    </span>
                    <h3 className="text-lg font-bold text-[#204972] mb-2">
                      {title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section
        className="relative py-20 bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(115deg, rgba(7,35,65,0.96), rgba(15,67,123,0.90), rgba(19,119,62,0.82)), url('/Image/Banner/banner-bg.jpg')",
        }}
      >
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full border-[70px] border-white/[0.03]" />
        <div className="absolute -bottom-28 -left-28 w-80 h-80 rounded-full bg-[#C8D42E]/10 blur-3xl" />

        <div className="container relative mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-8 items-end mb-12">
            <div className="lg:col-span-7">
              <span className="inline-block text-[#C8D42E] text-sm font-bold uppercase tracking-[0.2em] mb-4">
                What defines us
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Values we teach by.
                <span className="block text-[#acd0f3]">Promises we live by.</span>
              </h2>
            </div>
            <p className="lg:col-span-5 text-white/65 leading-relaxed lg:border-l border-white/20 lg:pl-6">
              These principles shape every class, resource, innovation, and
              interaction at PV Classes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-4">
            {[
              {
                title: "Student First",
                description:
                  "Every decision begins with the needs, growth, and success of our learners.",
                icon: <FaUsers />,
                accent: "bg-[#C8D42E]",
              },
              {
                title: "Excellence",
                description:
                  "We continuously raise the standard of our content, teaching, and technology.",
                icon: <FaStar />,
                accent: "bg-[#4fb3e8]",
              },
              {
                title: "Integrity",
                description:
                  "Transparency, honesty, and ethical practices build the trust our students deserve.",
                icon: <FaHandshake />,
                accent: "bg-[#58c985]",
              },
              {
                title: "Innovation",
                description:
                  "We embrace modern technology and fresh teaching methods to make learning smarter.",
                icon: <FaLightbulb />,
                accent: "bg-[#f5b942]",
              },
              {
                title: "Commitment",
                description:
                  "We stand beside every learner with consistent guidance from preparation to success.",
                icon: <FaAward />,
                accent: "bg-[#acd0f3]",
              },
            ].map((value, index) => (
              <article
                key={value.title}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.07] backdrop-blur-md p-6 min-h-64 transition-all duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-2xl ${
                  index < 3 ? "lg:col-span-2" : "lg:col-span-3"
                }`}
              >
                <span className="absolute right-5 top-3 text-6xl font-black text-white/[0.04] group-hover:text-[#204972]/5 transition-colors">
                  0{index + 1}
                </span>
                <div className="relative h-full flex flex-col">
                  <div className={`w-12 h-12 rounded-xl ${value.accent} text-[#173f67] flex items-center justify-center text-xl shadow-lg mb-8 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110`}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 transition-colors group-hover:text-[#204972]">
                    {value.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed transition-colors group-hover:text-gray-600">
                    {value.description}
                  </p>
                  <div className={`mt-auto pt-6 w-10 h-1 rounded-full ${value.accent} transition-all duration-500 group-hover:w-full`} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-b from-white via-[#f5f9fd] to-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#214B7D]/5 blur-3xl rounded-full" />
        <div className="container relative mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-10 items-end mb-12">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 bg-[#214B7D]/10 text-[#214B7D] px-4 py-2 rounded-full mb-5">
                <FaChalkboardTeacher />
                <span className="font-semibold">Leadership & Partnership</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#173f67] leading-tight">
                One vision. Two strengths.
                <span className="block text-[#13773E]">
                  A better future for learners.
                </span>
              </h2>
            </div>
            <p className="lg:col-span-5 text-gray-600 leading-relaxed lg:border-l-2 lg:border-[#C8D42E] lg:pl-6">
              Academic leadership and technology innovation work together to
              make quality education accessible, personal, and future-ready.
            </p>
          </div>

          <div className="relative rounded-[2rem] bg-white border border-[#214B7D]/10 shadow-[0_25px_70px_rgba(32,73,114,0.12)] overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <article className="relative p-8 md:p-12 lg:pr-16">
                <div className="absolute left-0 top-12 bottom-12 w-1.5 bg-gradient-to-b from-[#214B7D] to-[#13773E] rounded-r-full" />
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#214B7D] to-[#0F437B] text-white flex items-center justify-center text-xl font-extrabold shadow-lg">
                    PM
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#13773E]">
                      Founder & CEO
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#204972] mt-1">
                      Mr. Pankaj Meena
                    </h3>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">
                  With more than seven years in education, he has guided
                  thousands of students preparing for teaching and government
                  competitive examinations.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  His understanding of competitive exams, student psychology,
                  and modern teaching methods drives PV Classes&apos; focus on
                  quality learning, personal guidance, and career confidence.
                </p>

                <div className="flex flex-wrap gap-2 mt-8">
                  {["7+ Years", "Thousands Mentored", "Student First"].map(
                    (item) => (
                      <span
                        key={item}
                        className="text-xs font-semibold text-[#214B7D] bg-[#214B7D]/7 border border-[#214B7D]/10 px-3 py-2 rounded-full"
                      >
                        {item}
                      </span>
                    )
                  )}
                </div>
              </article>

              <article className="relative overflow-hidden bg-[#0d3156] text-white p-8 md:p-12 lg:pl-16">
                <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full border-[40px] border-white/5" />
                <div className="absolute -left-16 -bottom-24 w-56 h-56 rounded-full bg-[#13773E]/30 blur-2xl" />

                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-[#C8D42E] text-[#173f67] flex items-center justify-center text-2xl font-extrabold shadow-lg mb-7">
                    7U
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#C8D42E]">
                    Technology Partner
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold mt-2 mb-6 max-w-md">
                    Sevenunique Tech Solutions Pvt. Ltd.
                  </h3>
                  <p className="text-white/75 leading-relaxed mb-7">
                    Promoted by Mr. Dinesh Kumar, this partnership brings
                    scalable platforms, secure infrastructure, and advanced
                    software expertise into the PV Classes ecosystem.
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "AI Mock Interviews",
                      "Learning Analytics",
                      "Smart Dashboards",
                      "Secure Platform",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 rounded-xl bg-white/[0.07] border border-white/10 px-3 py-3 text-sm text-white/85"
                      >
                        <FaCheckCircle className="shrink-0 text-[#C8D42E]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </div>

          </div>
        </div>
      </section>

      {/* Vision 2030 */}
      <section className="relative py-20 px-6 overflow-hidden bg-[#0b2948] text-white">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,#C8D42E_0,transparent_30%),radial-gradient(circle_at_80%_80%,#4ade80_0,transparent_28%)]" />
        <div className="container relative mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-2 lg:sticky lg:top-24">
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-5">
                <FaBullseye className="text-[#C8D42E]" />
                <span className="font-semibold">Vision 2030</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6">
                India&apos;s largest platform for{" "}
                <span className="text-[#C8D42E]">
                  Special Educator preparation
                </span>
              </h2>
              <p className="text-white/70 leading-relaxed">
                Our ambition is to make PV Classes India&apos;s most trusted
                name in Special Educator preparation and a benchmark for
                educational innovation.
              </p>
            </div>

            <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
              {[
                "Become India’s No. 1 destination for Special Educator preparation.",
                "Empower more than one million learners through quality digital education.",
                "Publish India’s most trusted books and resources for Special Educator exams.",
                "Build an advanced AI platform for mock interviews and personalized learning.",
                "Expand online and offline learning centers across multiple states.",
                "Create a nationwide community committed to inclusive, quality education.",
              ].map((goal, index) => (
                <div
                  key={goal}
                  className={`rounded-2xl border border-white/10 bg-white/[0.07] backdrop-blur-sm p-6 ${
                    index === 0 || index === 5 ? "sm:col-span-2" : ""
                  }`}
                >
                  <FaCheckCircle className="text-[#C8D42E] text-xl mb-4" />
                  <p className="text-white/85 leading-relaxed">{goal}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 rounded-2xl border border-white/10 bg-white/[0.06] p-7 md:p-9 flex flex-col md:flex-row gap-5 md:items-center md:justify-between">
            <p className="text-xl md:text-2xl font-semibold max-w-3xl">
              Every aspiring teacher has the potential to inspire thousands of
              lives. We prepare future-ready educators—not only exam results.
            </p>
            <span className="text-[#C8D42E] font-bold whitespace-nowrap">
              Learn Today, Lead Tomorrow.
            </span>
          </div>
        </div>
      </section>

      {/* Enhanced Team Section with Teacher Profiles */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#204972] mb-4">
              Meet Our Expert Faculty
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team of experienced educators is dedicated to guiding students
              towards academic success with personalized attention.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Teacher 1: Pankaj Sir */}
            <div className="rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-cyan-50">
              <div className="p-6">
                {/* Teacher Image - Replace with actual image */}
                <div className="w-32 h-42 mx-auto overflow-hidden   mb-6">
                  <Image
                    src="/Image/pankajSir.png"
                    alt="Pankaj Sir - Maths & Chemistry Teacher"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    Pankaj Sir
                  </h3>
                  <p className="text-[#214B7D] font-semibold mb-2">
                    Mathematics & Chemistry
                  </p>

                  <div className="inline-block bg-gradient-to-r from-[#214B7D] to-[#5C6417] text-white text-xs font-medium px-3 py-1 rounded-full mb-4">
                    12+ Years Experience
                  </div>

                  <p className="text-gray-600 text-sm mb-4">
                    IIT-JEE, NEET Foundation Specialist
                  </p>

                  <div className="flex justify-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar key={star} className="text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#214B7D]/10 to-[#5C6417]/10 px-6 py-3 border-t border-gray-200">
                <div className="flex items-center justify-center text-sm">
                  <FaUsers className="text-[#214B7D] mr-2" />
                  <span className="text-gray-700">300+ Students Taught</span>
                </div>
              </div>
            </div>

            {/* Teacher 2: Vijay Sir */}
            <div className="rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50">
              <div className="p-6">
                <div className="w-32 h-42 mx-auto overflow-hidden   mb-6">
                  <Image
                    src="/Image/vijaySir.png"
                    alt="Vijay Sir - Geography Teacher"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    Vijay Sir
                  </h3>
                  <p className="text-[#214B7D] font-semibold mb-2">
                    Geography Expert
                  </p>

                  <div className="inline-block bg-gradient-to-r from-[#214B7D] to-[#5C6417] text-white text-xs font-medium px-3 py-1 rounded-full mb-4">
                    15+ Years Experience
                  </div>

                  <p className="text-gray-600 text-sm mb-4">
                    Rajasthan, India & World Geography
                  </p>

                  <div className="flex justify-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar key={star} className="text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#214B7D]/10 to-[#5C6417]/10 px-6 py-3 border-t border-gray-200">
                <div className="flex items-center justify-center text-sm">
                  <FaUsers className="text-[#214B7D] mr-2" />
                  <span className="text-gray-700">350+ Students Taught</span>
                </div>
              </div>
            </div>

            {/* Teacher 3: Akash Sir */}
            <div className="rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-amber-50 to-yellow-50">
              <div className="p-6">
                <div className="w-32 h-42 mx-auto overflow-hidden   mb-6">
                  <Image
                    src="/Image/aakashSir.png"
                    alt="Akash Sir - Polity Teacher"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    Akash Sir
                  </h3>
                  <p className="text-[#214B7D] font-semibold mb-2">
                    Polity Specialist
                  </p>

                  <div className="inline-block bg-gradient-to-r from-[#214B7D] to-[#5C6417] text-white text-xs font-medium px-3 py-1 rounded-full mb-4">
                    10+ Years Experience
                  </div>

                  <p className="text-gray-600 text-sm mb-4">
                    State Policy & Indian Polity
                  </p>

                  <div className="flex justify-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar key={star} className="text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#214B7D]/10 to-[#5C6417]/10 px-6 py-3 border-t border-gray-200">
                <div className="flex items-center justify-center text-sm">
                  <FaUsers className="text-[#214B7D] mr-2 " />
                  <span className="text-gray-700">280+ Students Taught</span>
                </div>
              </div>
            </div>

            {/* Teacher 4: Uma Ma'am */}
            <div className="rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50">
              <div className="p-6">
                <div className="w-32 h-42 mx-auto overflow-hidden   mb-6">
                  <Image
                    src="/Image/umaMam.png"
                    alt="Uma Ma'am - History Teacher"
                    width={128}
                    height={128}
                    className=" object-cover"
                  />
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    Uma Ma&apos;am
                  </h3>
                  <p className="text-[#214B7D] font-semibold mb-2">
                    History & Culture
                  </p>

                  <div className="inline-block bg-gradient-to-r from-[#214B7D] to-[#5C6417] text-white text-xs font-medium px-3 py-1 rounded-full mb-4">
                    8+ Years Experience
                  </div>

                  <p className="text-gray-600 text-sm mb-4">
                    Rajasthan Culture & History
                  </p>

                  <div className="flex justify-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar key={star} className="text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#214B7D]/10 to-[#5C6417]/10 px-6 py-3 border-t border-gray-200">
                <div className="flex items-center justify-center text-sm">
                  <FaUsers className="text-[#214B7D] mr-2" />
                  <span className="text-gray-700">250+ Students Taught</span>
                </div>
              </div>
            </div>
          </div>

          {/* Teaching Methodology Section (same as before) */}
          {/* Teaching Methodology */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-[#204972] mb-3">
                Our Teaching Methodology
              </h3>
              <p className="text-gray-600">
                A structured approach to ensure comprehensive learning
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: "01",
                  title: "Concept Building",
                  desc: "Strong foundation of basic concepts",
                },
                {
                  step: "02",
                  title: "Practice Sessions",
                  desc: "Regular problem-solving practice",
                },
                {
                  step: "03",
                  title: "Doubt Clearing",
                  desc: "Personalized doubt resolution",
                },
                {
                  step: "04",
                  title: "Revision & Tests",
                  desc: "Systematic revision and assessments",
                },
              ].map((method, idx) => (
                <div key={idx} className="text-center p-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[#214B7D] to-[#5C6417] text-white font-bold text-lg mb-4">
                    {method.step}
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">
                    {method.title}
                  </h4>
                  <p className="text-sm text-gray-600">{method.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-16 my-10 bg-gradient-to-r from-[#0F437B] via-[#214B7D] to-[#13773E] text-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-10 items-center gap-10">
            {/* LEFT SIDE - 70% */}
            <div className="lg:col-span-6">
              <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
                Begin Your Success Journey Today
              </h2>

              <p className="text-lg lg:text-xl text-white/90 mb-8 max-w-2xl">
                Join hundreds of successful students who have achieved their
                academic goals with PV Classes through expert guidance, quality
                study material, and personalized mentorship.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 mb-12">
                <Link
                  href="/contact-us"
                  className="bg-white text-[#204972] px-8 py-4 rounded-xl font-semibold shadow-lg hover:-translate-y-1 hover:shadow-2xl transition-all"
                >
                  Contact for Admission
                </Link>

                <Link
                  href="/courses"
                  className="border-2 border-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[#204972] transition-all"
                >
                  View Our Courses
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/20 pt-8">
                {[
                  { label: "Free Demo", value: "Available" },
                  { label: "Study Material", value: "Provided" },
                  { label: "Batch Size", value: "Limited" },
                  { label: "Success Rate", value: "95%" },
                ].map((item, idx) => (
                  <div key={idx}>
                    <h3 className="text-2xl font-bold text-[#C8D42E]">
                      {item.value}
                    </h3>
                    <p className="text-white/80 text-sm mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE - 30% */}
            <div className="lg:col-span-4 flex justify-center">
              <img
                src="/Image/Banner/students.png"
                alt="PV Classes"
                className="w-full max-w-[420px] object-cover rounded-xl drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
