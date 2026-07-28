"use client";

import Link from "next/link";
import {
  ShieldCheck,
  Database,
  Bot,
  Cookie,
  Share2,
  LockKeyhole,
  UserCheck,
  MessageCircle,
  Clock3,
  Scale,
  Mail,
  BookOpen,
  CreditCard,
  Check,
} from "lucide-react";

const policySections = [
  {
    id: "information",
    number: "01",
    title: "Information We Collect",
    icon: Database,
    intro: "We may collect information you provide while using PV Classes.",
    groups: [
      {
        label: "Personal information",
        items: [
          "Full name",
          "Mobile number",
          "Email address",
          "Date of birth, if required",
          "Billing and shipping address",
          "Parent or guardian details, where applicable",
        ],
      },
      {
        label: "Account information",
        items: [
          "Username",
          "Login history",
          "Purchased courses",
          "Order history",
          "Learning progress",
        ],
      },
    ],
    note:
      "Payments are processed through secure third-party gateways. PV Classes does not store debit or credit card details, UPI PINs, CVVs, or net-banking credentials on its servers.",
  },
  {
    id: "automatic-data",
    number: "02",
    title: "Automatically Collected Information",
    icon: Database,
    intro: "When you use our platform, we may automatically collect:",
    items: [
      "IP address",
      "Browser type",
      "Device information",
      "Operating system",
      "Language preference",
      "Pages visited",
      "Time spent on the website",
      "Referral source",
      "Cookies and analytics data",
    ],
  },
  {
    id: "use",
    number: "03",
    title: "How We Use Your Information",
    icon: UserCheck,
    intro: "Your information may be used to:",
    items: [
      "Create and manage your account",
      "Deliver online courses and track learning progress",
      "Process book orders and payments",
      "Provide customer support",
      "Conduct AI Mock Interviews",
      "Send OTPs, login verification, and order confirmations",
      "Share important academic updates",
      "Improve website performance",
      "Detect fraud and misuse",
      "Comply with applicable laws",
    ],
  },
  {
    id: "ai-services",
    number: "04",
    title: "AI Services",
    icon: Bot,
    intro:
      "If you use AI-powered features, including AI Mock Interviews, the following practices apply:",
    items: [
      "Voice recordings, when enabled, may be processed to generate feedback.",
      "Interview responses may be analyzed to provide educational insights.",
      "AI-generated scores are intended solely for learning purposes.",
      "AI reports are not official examination results and do not guarantee selection.",
    ],
  },
  {
    id: "books",
    number: "05",
    title: "Books & Delivery Information",
    icon: BookOpen,
    intro:
      "For printed-book orders, we may collect the recipient name, delivery address, and contact number.",
    note:
      "This information is shared only with logistics or courier partners as required to fulfill your order.",
  },
  {
    id: "cookies",
    number: "06",
    title: "Cookies",
    icon: Cookie,
    intro: "PV Classes uses cookies to:",
    items: [
      "Keep users logged in",
      "Remember preferences",
      "Improve website performance",
      "Analyze visitor behavior",
      "Enhance the user experience",
    ],
    note:
      "You may disable cookies through your browser settings; however, some website features may not function properly.",
  },
  {
    id: "sharing",
    number: "07",
    title: "Information Sharing",
    icon: Share2,
    intro: "We do not sell, rent, or trade your personal information.",
    items: [
      "Payment gateway providers",
      "Courier and logistics partners",
      "Cloud hosting providers",
      "SMS and email service providers",
      "Technical support partners",
    ],
    note:
      "Information is shared only where necessary with trusted providers, or where required by law or a lawful government request.",
  },
  {
    id: "security",
    number: "08",
    title: "Data Security",
    icon: LockKeyhole,
    intro:
      "PV Classes uses reasonable technical and organizational safeguards to protect your information against unauthorized access, misuse, alteration, or disclosure.",
    note:
      "While we strive to protect your information, no online platform can guarantee absolute security.",
  },
  {
    id: "responsibilities",
    number: "09",
    title: "Student Responsibilities",
    icon: UserCheck,
    intro: "Users should:",
    items: [
      "Keep login credentials confidential",
      "Not share accounts with others",
      "Log out after using public devices",
    ],
    note:
      "Users are responsible for activities carried out through their accounts.",
  },
  {
    id: "communication",
    number: "10",
    title: "Communication",
    icon: MessageCircle,
    intro:
      "By registering with PV Classes, you agree that we may contact you regarding purchases, academic updates, announcements, or customer support through:",
    items: ["Email", "SMS", "Phone calls", "WhatsApp", "Website notifications"],
    note:
      "You may opt out of promotional communications wherever such an option is available.",
  },
  {
    id: "retention",
    number: "11",
    title: "Data Retention",
    icon: Clock3,
    intro:
      "We retain personal information only for as long as reasonably necessary to:",
    items: [
      "Provide educational services",
      "Maintain purchase records",
      "Comply with legal and accounting obligations",
      "Resolve disputes",
      "Enforce our policies",
    ],
  },
  {
    id: "children",
    number: "12",
    title: "Children’s Privacy",
    icon: ShieldCheck,
    intro:
      "If our services are used by minors, they should do so under the supervision of a parent or legal guardian.",
  },
  {
    id: "third-party-links",
    number: "13",
    title: "Third-Party Links",
    icon: Share2,
    intro:
      "Our website may contain links to third-party websites. PV Classes is not responsible for the privacy practices or content of those external websites.",
  },
  {
    id: "rights",
    number: "14",
    title: "Your Rights",
    icon: UserCheck,
    intro: "Subject to applicable law, you may request to:",
    items: [
      "Access your personal information",
      "Correct inaccurate information",
      "Update your contact details",
      "Request deletion where legally permissible",
    ],
    note:
      "Requests may be submitted through our official support channels.",
  },
  {
    id: "updates",
    number: "15",
    title: "Policy Updates",
    icon: Clock3,
    intro:
      "PV Classes may update this Privacy Policy from time to time. A revised version becomes effective once it is published on the website.",
  },
  {
    id: "law",
    number: "16",
    title: "Governing Law",
    icon: Scale,
    intro:
      "This Privacy Policy is governed by the applicable laws of India.",
  },
  {
    id: "contact",
    number: "17",
    title: "Contact Us",
    icon: Mail,
    intro:
      "For privacy-related questions, requests, or concerns, please contact PV Classes through the official contact information published on our website.",
  },
];

export default function PrivacyPolicy() {
  return (
    <main className="privacy-policy-page bg-[#f4f8fb]">
      {/*
        Original desktop/mobile image banner disabled to avoid displaying two
        visually similar hero sections.

      <section className="relative w-full h-[80vh] sm:h-[60vh] lg:h-[60vh] text-white">
        <div className="absolute inset-0 hidden sm:block">
          <Image
            src="/Image/Banner/privacy-banner.webp"
            alt="PV Classes Privacy Policy"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 block sm:hidden">
          <Image
            src="/Image/pv-mobile/privacy-mob.webp"
            alt="PV Classes Privacy Policy"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
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
            <span className="text-white/85">Privacy Policy</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] border border-white/10 px-4 py-2 text-sm font-semibold text-[#dce96b] mb-6">
                <ShieldCheck size={17} />
                Your data. Your rights. Our responsibility.
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight mb-5">
                Privacy you can
                <span className="block text-[#C8D42E]">understand and trust.</span>
              </h1>
              <p className="text-base md:text-lg text-white/68 leading-relaxed max-w-3xl">
                Learn how PV Classes collects, uses, stores, and protects your
                information across our learning platform, AI services, books,
                and educational experiences.
              </p>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/10 p-6">
                <div className="flex items-center gap-3 pb-5 border-b border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-[#C8D42E] text-[#173f67] flex items-center justify-center">
                    <ShieldCheck size={20} />
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
                    ["17", "Sections"],
                    ["India", "Law"],
                    ["Secure", "Payments"],
                  ].map(([value, label]) => (
                    <div key={label}>
                      <div className="font-extrabold text-[#C8D42E]">{value}</div>
                      <div className="text-[11px] text-white/45 mt-1">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 mt-8 pt-6 border-t border-white/10">
            {[
              ["No data selling", "We do not sell, rent, or trade personal information."],
              ["Secure payments", "Sensitive payment credentials are not stored by us."],
              ["Your control", "Access, correction, and deletion requests are supported."],
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
              <ShieldCheck className="text-[#13773E] shrink-0 mt-1" />
              <div>
                <h2 className="font-bold text-[#204972] text-lg mb-2">
                  Our commitment
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  PV Classes respects your privacy and is committed to
                  protecting your personal information. By accessing or using
                  PV Classes, you agree to the practices described in this
                  Privacy Policy.
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <aside className="lg:col-span-3 lg:sticky lg:top-24">
              <div className="rounded-2xl bg-white border border-gray-200 p-5 shadow-sm">
                <h2 className="font-bold text-[#204972] mb-4">
                  Policy contents
                </h2>
                <nav className="max-h-[65vh] overflow-y-auto pr-2 space-y-1 [scrollbar-width:thin] [scrollbar-color:#9eb76c_transparent] [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gradient-to-b [&::-webkit-scrollbar-thumb]:from-[#c8d42e] [&::-webkit-scrollbar-thumb]:to-[#13773e]">
                  {policySections.map((section) => (
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
              {policySections.map((section) => {
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

                    {section.groups && (
                      <div className="grid md:grid-cols-2 gap-4 mt-6">
                        {section.groups.map((group) => (
                          <div
                            key={group.label}
                            className="rounded-xl bg-[#f7fafc] border border-gray-100 p-5"
                          >
                            <h3 className="font-bold text-[#204972] mb-3">
                              {group.label}
                            </h3>
                            <ul className="space-y-2">
                              {group.items.map((item) => (
                                <li
                                  key={item}
                                  className="flex items-start gap-2 text-sm text-gray-600"
                                >
                                  <Check
                                    size={15}
                                    className="text-[#13773E] shrink-0 mt-0.5"
                                  />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}

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
                        {section.id === "information" && (
                          <CreditCard
                            size={17}
                            className="inline mr-2 text-[#616602]"
                          />
                        )}
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
