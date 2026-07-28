"use client";

import Link from "next/link";
import {
  Scale,
  GraduationCap,
  UserCheck,
  ClipboardList,
  CreditCard,
  RotateCcw,
  BookOpen,
  FileLock2,
  Bot,
  Copyright,
  ShieldAlert,
  UserX,
  ExternalLink,
  BadgeAlert,
  ShieldCheck,
  RefreshCw,
  Mail,
  Check,
} from "lucide-react";

const termsSections = [
  {
    id: "about",
    number: "01",
    title: "About PV Classes",
    icon: GraduationCap,
    intro:
      "PV Classes is an educational platform providing coaching, online and offline courses, printed books, study materials, mock interviews, AI-based learning tools, test series, and other resources for competitive examinations.",
  },
  {
    id: "eligibility",
    number: "02",
    title: "Eligibility",
    icon: UserCheck,
    intro:
      "You must be at least 18 years old, or use the services under the supervision of a parent or legal guardian.",
  },
  {
    id: "registration",
    number: "03",
    title: "User Registration",
    icon: ClipboardList,
    intro:
      "Certain services may require an account. When registering, you agree that:",
    items: [
      "All information you provide is accurate.",
      "You will maintain the confidentiality of your login credentials.",
      "You are responsible for all activity under your account.",
    ],
    note:
      "PV Classes may suspend or terminate accounts involved in fraudulent or unauthorized activities.",
  },
  {
    id: "services",
    number: "04",
    title: "Educational Services",
    icon: GraduationCap,
    intro: "Our educational services may include:",
    items: [
      "Live classes",
      "Recorded courses",
      "Printed books",
      "Digital notes",
      "Test series",
      "AI Mock Interviews",
      "Mock interview programs",
      "Educational guidance",
      "Other learning resources",
    ],
    note:
      "Course features, validity, pricing, and access duration are displayed on the respective course pages.",
  },
  {
    id: "payments",
    number: "05",
    title: "Payments",
    icon: CreditCard,
    intro:
      "All payments must be made using the payment methods available on the website.",
    note:
      "PV Classes may revise course fees, book prices, offers, or discounts without prior notice.",
  },
  {
    id: "refunds",
    number: "06",
    title: "Refunds",
    icon: RotateCcw,
    intro:
      "Refunds and cancellations are governed by our separate Refund & Cancellation Policy available on the website.",
  },
  {
    id: "book-orders",
    number: "07",
    title: "Printed Book Orders",
    icon: BookOpen,
    intro:
      "Delivery timelines are approximate and may vary based on courier services and delivery location.",
    note:
      "PV Classes is not responsible for delays caused by courier partners, natural disasters, strikes, or circumstances beyond our control.",
  },
  {
    id: "digital-content",
    number: "08",
    title: "Digital Content Usage",
    icon: FileLock2,
    intro:
      "All digital content is licensed only for your personal educational use. Users must not:",
    items: [
      "Copy protected content",
      "Download content illegally",
      "Screen record classes or resources",
      "Share login credentials",
      "Upload content to YouTube, Telegram, or other platforms",
      "Sell or redistribute PV Classes material",
    ],
    note:
      "Violations may result in permanent account suspension and legal action.",
  },
  {
    id: "ai-interviews",
    number: "09",
    title: "AI Mock Interview Services",
    icon: Bot,
    intro:
      "AI-generated interview scores, feedback, and recommendations are provided solely for learning and practice.",
    note:
      "They are not official examination results and must not be interpreted as guarantees of selection.",
  },
  {
    id: "intellectual-property",
    number: "10",
    title: "Intellectual Property",
    icon: Copyright,
    intro:
      "Unless otherwise stated, all content available through PV Classes is its exclusive intellectual property, including:",
    items: [
      "Videos",
      "Books",
      "PDFs and notes",
      "Logos and images",
      "Website design",
      "Mobile application",
      "AI content",
      "Test series",
    ],
    note: "Unauthorized use is strictly prohibited.",
  },
  {
    id: "responsibilities",
    number: "11",
    title: "User Responsibilities",
    icon: ShieldAlert,
    intro: "Users agree not to:",
    items: [
      "Engage in unlawful activities",
      "Misuse website services",
      "Attempt unauthorized access",
      "Introduce malware or viruses",
      "Disrupt website functionality",
      "Share copyrighted material",
    ],
  },
  {
    id: "suspension",
    number: "12",
    title: "Account Suspension",
    icon: UserX,
    intro:
      "PV Classes may suspend or terminate an account without prior notice if:",
    items: [
      "Fake information is provided",
      "Payment fraud is detected",
      "Content piracy occurs",
      "Login credentials are shared",
      "These Terms & Conditions are violated",
    ],
  },
  {
    id: "third-party",
    number: "13",
    title: "Third-Party Services",
    icon: ExternalLink,
    intro:
      "Our website may contain links to third-party websites or payment gateways. PV Classes is not responsible for their content, policies, or services.",
  },
  {
    id: "liability",
    number: "14",
    title: "Limitation of Liability",
    icon: BadgeAlert,
    intro:
      "PV Classes provides educational guidance only and does not guarantee:",
    items: [
      "Government job selection",
      "Examination success",
      "Interview qualification",
      "Employment opportunities",
    ],
    note:
      "Individual performance depends on personal preparation, effort, eligibility, and examination standards.",
  },
  {
    id: "privacy",
    number: "15",
    title: "Privacy",
    icon: ShieldCheck,
    intro:
      "Use of PV Classes services is also governed by our Privacy Policy.",
  },
  {
    id: "changes",
    number: "16",
    title: "Changes to Terms",
    icon: RefreshCw,
    intro:
      "PV Classes may update these Terms & Conditions at any time. The latest version published on the website will be considered effective.",
  },
  {
    id: "law",
    number: "17",
    title: "Governing Law",
    icon: Scale,
    intro:
      "These Terms are governed by the laws of India.",
    note:
      "Disputes arising from these Terms are subject to the jurisdiction of competent courts where PV Classes conducts its principal business operations.",
  },
  {
    id: "contact",
    number: "18",
    title: "Contact Us",
    icon: Mail,
    intro:
      "For questions regarding these Terms & Conditions, please contact us through the official details published on the PV Classes website.",
  },
];

export default function TermsOfUse() {
  return (
    <main className="terms-page bg-[#f4f8fb]">
      {/*
        Original desktop/mobile image banner disabled in favor of the compact
        custom Terms & Conditions hero below.

        <section className="relative w-full h-[80vh] sm:h-[60vh] lg:h-[60vh]">
          Desktop image: /Image/Banner/terms-banner.webp
          Mobile image: /Image/pv-mobile/terms-mob.webp
        </section>
      */}

      <section className="relative overflow-hidden bg-[#092947] text-white">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(9,41,71,1)_10%,rgba(15,67,123,0.96)_58%,rgba(19,119,62,0.82)_100%)]" />
        <div className="absolute -top-36 -right-28 w-[460px] h-[460px] rounded-full border-[85px] border-white/[0.035]" />
        <div className="absolute -bottom-48 left-1/4 w-[520px] h-[520px] rounded-full bg-[#13773E]/25 blur-3xl" />
        <div className="absolute top-16 right-[18%] w-3 h-3 rounded-full bg-[#C8D42E] shadow-[0_0_30px_8px_rgba(200,212,46,0.3)]" />

        <div className="container relative mx-auto max-w-6xl px-6 py-12 md:py-16">
          <div className="flex items-center gap-2 text-sm text-white/55 mb-6">
            <span>PV Classes</span>
            <span className="text-[#C8D42E]">/</span>
            <span className="text-white/85">Terms & Conditions</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] border border-white/10 px-4 py-2 text-sm font-semibold text-[#dce96b] mb-6">
                <Scale size={17} />
                Clear terms for confident learning
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight mb-5">
                Terms built on
                <span className="block text-[#C8D42E]">
                  fairness and trust.
                </span>
              </h1>
              <p className="text-base md:text-lg text-white/68 leading-relaxed max-w-3xl">
                Understand the rules governing your use of PV Classes courses,
                books, test series, AI services, and educational resources.
              </p>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/10 p-6">
                <div className="flex items-center gap-3 pb-5 border-b border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-[#C8D42E] text-[#173f67] flex items-center justify-center">
                    <Scale size={20} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-white/45">
                      Current version
                    </div>
                    <div className="font-bold text-white mt-1">
                      Effective 23 July 2026
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 pt-5 text-center">
                  {[
                    ["18", "Sections"],
                    ["India", "Law"],
                    ["Personal", "License"],
                  ].map(([value, label]) => (
                    <div key={label}>
                      <div className="font-extrabold text-[#C8D42E]">
                        {value}
                      </div>
                      <div className="text-[11px] text-white/45 mt-1">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 mt-8 pt-6 border-t border-white/10">
            {[
              ["Personal access", "Course content is licensed for individual educational use."],
              ["Protected content", "PV Classes resources may not be copied or redistributed."],
              ["Learning guidance", "Results depend on individual effort and examination standards."],
            ].map(([title, description]) => (
              <div key={title} className="flex gap-3">
                <Check size={17} className="text-[#C8D42E] shrink-0 mt-1" />
                <div>
                  <h2 className="font-bold text-sm">{title}</h2>
                  <p className="text-xs text-white/50 leading-relaxed mt-1">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-16 md:py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#214B7D]/5 rounded-full blur-3xl" />
        <div className="relative max-w-6xl mx-auto">
          <div className="rounded-2xl bg-white border border-[#214B7D]/10 p-6 md:p-8 mb-10 shadow-sm">
            <div className="flex gap-4">
              <Scale className="text-[#13773E] shrink-0 mt-1" />
              <div>
                <h2 className="font-bold text-[#204972] text-lg mb-2">
                  Agreement to these terms
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  These Terms & Conditions govern access to and use of PV
                  Classes services. By using our website, platform, books, or
                  educational services, you agree to be bound by these Terms.
                  If you disagree with any part, please do not use our services.
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <aside className="lg:col-span-3 lg:sticky lg:top-24">
              <div className="rounded-2xl bg-white border border-gray-200 p-5 shadow-sm">
                <h2 className="font-bold text-[#204972] mb-4">Terms contents</h2>
                <nav className="max-h-[65vh] overflow-y-auto pr-2 space-y-1 [scrollbar-width:thin] [scrollbar-color:#9eb76c_transparent] [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gradient-to-b [&::-webkit-scrollbar-thumb]:from-[#c8d42e] [&::-webkit-scrollbar-thumb]:to-[#13773e]">
                  {termsSections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-[#eef5fb] hover:text-[#204972] transition-colors"
                    >
                      <span className="text-xs font-bold text-[#13773E]">
                        {section.number}
                      </span>
                      <span>{section.title}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            <div className="lg:col-span-9 space-y-5">
              {termsSections.map((section) => {
                const Icon = section.icon;
                return (
                  <article
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-24 rounded-2xl bg-white border border-gray-200 p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#eef5fb] text-[#204972] flex items-center justify-center shrink-0">
                        <Icon size={22} />
                      </div>
                      <div>
                        <span className="text-xs font-bold tracking-wider text-[#13773E]">
                          SECTION {section.number}
                        </span>
                        <h2 className="text-xl md:text-2xl font-bold text-[#204972] mt-1">
                          {section.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed">
                      {section.intro}
                    </p>

                    {section.items && (
                      <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mt-6">
                        {section.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-gray-600"
                          >
                            <Check
                              size={16}
                              className="text-[#13773E] shrink-0 mt-0.5"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.note && (
                      <div className="mt-6 rounded-xl border-l-4 border-[#C8D42E] bg-[#f8faed] px-5 py-4 text-sm text-gray-700 leading-relaxed">
                        {section.note}
                      </div>
                    )}

                    {section.id === "contact" && (
                      <Link
                        href="/contact-us"
                        className="inline-flex items-center gap-2 mt-6 rounded-xl bg-[#204972] px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-[#13773E] hover:-translate-y-0.5 transition-all"
                      >
                        Go to Contact Us
                        <span aria-hidden="true">→</span>
                      </Link>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
