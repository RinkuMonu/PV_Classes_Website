import { Check, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function LegalPolicyPage({
  title,
  eyebrow,
  headline,
  description,
  sections,
  highlights,
}) {
  return (
    <main className="legal-policy-page bg-[#f4f8fb]">
      <section className="relative overflow-hidden bg-[#092947] text-white">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(9,41,71,1)_10%,rgba(15,67,123,0.96)_58%,rgba(19,119,62,0.82)_100%)]" />
        <div className="absolute -top-36 -right-28 w-[460px] h-[460px] rounded-full border-[85px] border-white/[0.035]" />
        <div className="absolute -bottom-48 left-1/4 w-[520px] h-[520px] rounded-full bg-[#13773E]/25 blur-3xl" />
        <div className="container relative mx-auto max-w-6xl px-6 py-12 md:py-16">
          <div className="flex items-center gap-2 text-sm text-white/55 mb-6">
            <span>PV Classes</span>
            <span className="text-[#C8D42E]">/</span>
            <span className="text-white/85">{title}</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] border border-white/10 px-4 py-2 text-sm font-semibold text-[#dce96b] mb-6">
                <ShieldCheck size={17} />
                {eyebrow}
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight mb-5">
                {headline}
              </h1>
              <p className="text-base md:text-lg text-white/68 leading-relaxed max-w-3xl">
                {description}
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
                    <div className="font-bold mt-1">Effective 23 July 2026</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-5 text-center">
                  <div>
                    <div className="font-extrabold text-[#C8D42E]">
                      {sections.length}
                    </div>
                    <div className="text-[11px] text-white/45 mt-1">
                      Sections
                    </div>
                  </div>
                  <div>
                    <div className="font-extrabold text-[#C8D42E]">India</div>
                    <div className="text-[11px] text-white/45 mt-1">
                      Website scope
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 mt-8 pt-6 border-t border-white/10">
            {highlights.map(([itemTitle, itemDescription]) => (
              <div key={itemTitle} className="flex gap-3">
                <Check size={17} className="text-[#C8D42E] shrink-0 mt-1" />
                <div>
                  <h2 className="font-bold text-sm">{itemTitle}</h2>
                  <p className="text-xs text-white/50 leading-relaxed mt-1">
                    {itemDescription}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-16 md:py-20 overflow-hidden">
        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-12 gap-8 items-start">
          <aside className="lg:col-span-3 lg:sticky lg:top-24">
            <div className="rounded-2xl bg-white border border-gray-200 p-5 shadow-sm">
              <h2 className="font-bold text-[#204972] mb-4">Policy contents</h2>
              <nav className="max-h-[65vh] overflow-y-auto pr-2 space-y-1 [scrollbar-width:thin] [scrollbar-color:#9eb76c_transparent] [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gradient-to-b [&::-webkit-scrollbar-thumb]:from-[#c8d42e] [&::-webkit-scrollbar-thumb]:to-[#13773e]">
                {sections.map((section, index) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-[#eef5fb] hover:text-[#204972] transition-colors"
                  >
                    <span className="text-xs font-bold text-[#13773E]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{section.title}</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="lg:col-span-9 space-y-5">
            {sections.map((section, index) => {
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
                        SECTION {String(index + 1).padStart(2, "0")}
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
      </section>
    </main>
  );
}
