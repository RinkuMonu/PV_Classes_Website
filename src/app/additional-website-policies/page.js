import {
  Copyright,
  Cookie,
  Bot,
  Users,
  MessagesSquare,
  Share2,
  FileWarning,
  UserCog,
  CreditCard,
  ShieldCheck,
  RefreshCw,
  Mail,
} from "lucide-react";
import LegalPolicyPage from "../../components/LegalPolicyPage";

const sections = [
  {
    id: "copyright",
    title: "Copyright & Intellectual Property",
    icon: Copyright,
    intro:
      "Unless otherwise stated, PV Classes exclusively owns its books, e-books, notes, PDFs, lectures, classes, test series, AI reports, design, logos, graphics, and course material.",
    items: [
      "Do not copy or reproduce content",
      "Do not record live or recorded classes",
      "Do not upload content to social or messaging platforms",
      "Do not sell, distribute, or commercially exploit material",
    ],
    note:
      "Violations may result in permanent account suspension and legal action.",
  },
  {
    id: "cookies",
    title: "Cookie Policy",
    icon: Cookie,
    intro: "PV Classes uses cookies and similar technologies to:",
    items: [
      "Improve website performance",
      "Remember preferences",
      "Keep users logged in",
      "Analyze website traffic",
      "Enhance user experience",
      "Provide personalized content",
    ],
    note:
      "Browser settings can disable cookies, although some features may then work incorrectly.",
  },
  {
    id: "ai",
    title: "AI Usage Policy",
    icon: Bot,
    intro:
      "PV Classes may offer AI Mock Interviews, performance analysis, feedback, and learning assistance.",
    items: [
      "AI output is for educational purposes",
      "AI scores are indicative, not official",
      "Recommendations do not guarantee success",
      "Users must not submit unlawful, offensive, or misleading content",
    ],
  },
  {
    id: "community",
    title: "Community Guidelines",
    icon: Users,
    intro: "To maintain a respectful learning environment, users must:",
    items: [
      "Respect faculty, staff, and students",
      "Avoid abusive, threatening, defamatory, or offensive language",
      "Avoid spam and promotional content",
      "Never impersonate another person",
      "Not share copyrighted material",
      "Not disrupt classes or discussions",
    ],
    note:
      "Violations may result in suspension or permanent removal.",
  },
  {
    id: "grievances",
    title: "Grievance Redressal",
    icon: MessagesSquare,
    intro:
      "Our support team accepts concerns relating to payments, book orders, course access, technical issues, accounts, privacy, and copyright.",
    note:
      "PV Classes aims to acknowledge genuine grievances within a reasonable period and work toward an appropriate resolution.",
  },
  {
    id: "affiliate",
    title: "Affiliate & Referral Policy",
    icon: Share2,
    intro: "Participants in applicable referral programs must:",
    items: [
      "Share links ethically",
      "Avoid false or misleading claims",
      "Avoid fraudulent referrals or fake registrations",
      "Follow applicable promotional guidelines",
    ],
    note:
      "PV Classes may modify or terminate benefits where misuse occurs.",
  },
  {
    id: "complaints",
    title: "Copyright Complaint Policy",
    icon: FileWarning,
    intro: "A written copyright complaint should include:",
    items: [
      "Your name and contact details",
      "Description of the copyrighted work",
      "URL or location of disputed content",
      "A declaration that the information is accurate",
    ],
    note:
      "After review, PV Classes may remove or restrict access to infringing content.",
  },
  {
    id: "accounts",
    title: "User Account Policy",
    icon: UserCog,
    intro:
      "Users must protect their credentials and must not share accounts, allow multiple users, attempt unauthorized access, or create fake or duplicate accounts.",
    note:
      "Fraudulent or unauthorized activity may result in account suspension or termination.",
  },
  {
    id: "payments",
    title: "Payment Terms",
    icon: CreditCard,
    intro:
      "All payments must use authorized website methods. Users acknowledge:",
    items: [
      "Prices may change without notice",
      "Offers have specific terms",
      "Confirmation requires successful verification",
      "Duplicate payments follow the Refund Policy",
      "Applicable taxes follow prevailing law",
    ],
  },
  {
    id: "conduct",
    title: "Code of Conduct",
    icon: ShieldCheck,
    intro: "Every user agrees to:",
    items: [
      "Follow website policies",
      "Respect intellectual-property rights",
      "Use resources for personal learning",
      "Remain honest during tests and AI interviews",
      "Avoid harming the website, faculty, students, or PV Classes’ reputation",
    ],
    note:
      "PV Classes may suspend, restrict, or permanently terminate access for violations.",
  },
  {
    id: "updates",
    title: "Policy Updates",
    icon: RefreshCw,
    intro:
      "PV Classes may revise these policies at any time. The latest published version applies.",
  },
  {
    id: "contact",
    title: "Contact Us",
    icon: Mail,
    intro:
      "For questions regarding these policies, contact PV Classes through the official details published on our website.",
  },
];

export default function AdditionalPoliciesPage() {
  return (
    <LegalPolicyPage
      title="Additional Website Policies"
      eyebrow="Responsible use of our platform"
      headline={<>A safer, fairer learning community.</>}
      description="These operational policies explain acceptable content use, cookies, AI, community behavior, grievances, referrals, accounts, and payments."
      highlights={[
        ["Respect content", "PV Classes resources are protected intellectual property."],
        ["Use AI responsibly", "Automated features support education and practice."],
        ["Community first", "Respectful and honest participation is required."],
      ]}
      sections={sections}
    />
  );
}
