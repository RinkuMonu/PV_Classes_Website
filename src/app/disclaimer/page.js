import {
  GraduationCap,
  BadgeAlert,
  SearchCheck,
  Bot,
  BookOpen,
  ExternalLink,
  CreditCard,
  Server,
  ShieldAlert,
  UserCheck,
  Copyright,
  Landmark,
  RefreshCw,
  Scale,
  Mail,
} from "lucide-react";
import LegalPolicyPage from "../../components/LegalPolicyPage";

const sections = [
  {
    id: "education",
    title: "Educational Purpose Only",
    icon: GraduationCap,
    intro:
      "PV Classes is an independent educational platform. Its coaching, books, mock interviews, AI practice tools, and study resources support learning and preparation only.",
  },
  {
    id: "no-guarantee",
    title: "No Guarantee of Selection",
    icon: BadgeAlert,
    intro: "PV Classes does not guarantee:",
    items: [
      "Selection in an examination",
      "Government employment",
      "Interview success",
      "Admission to an institution",
      "A specific score, rank, or result",
    ],
    note:
      "Success depends on preparation, eligibility, examination patterns, competition, and individual performance.",
  },
  {
    id: "accuracy",
    title: "Accuracy of Information",
    icon: SearchCheck,
    intro:
      "We make reasonable efforts to keep information accurate and current, but notifications, eligibility, syllabus, vacancies, rules, and government policies may change.",
    note:
      "Verify important information with the relevant official authority before making decisions.",
  },
  {
    id: "ai",
    title: "AI-Based Features",
    icon: Bot,
    intro: "AI-powered services may include:",
    items: [
      "AI Mock Interviews",
      "AI feedback",
      "AI performance analysis",
      "AI learning assistance",
    ],
    note:
      "Automated reports, scores, suggestions, and recommendations are for practice only—not official evaluations or guarantees.",
  },
  {
    id: "materials",
    title: "Books & Study Material",
    icon: BookOpen,
    intro:
      "Our resources are prepared with due care by subject experts, but typographical, printing, or unintentional inaccuracies may occasionally occur.",
    note: "PV Classes may update or revise educational content at any time.",
  },
  {
    id: "third-party",
    title: "Third-Party Links",
    icon: ExternalLink,
    intro:
      "PV Classes is not responsible for external websites, payment gateways, videos, social platforms, couriers, or other resources, including:",
    items: [
      "Third-party content",
      "External privacy practices",
      "Service availability",
      "Transactions outside PV Classes",
    ],
  },
  {
    id: "payments",
    title: "Payment Gateway Disclaimer",
    icon: CreditCard,
    intro:
      "Authorized third parties process payments. PV Classes is not responsible for external delays, failures, banking interruptions, or gateway outages beyond its control.",
  },
  {
    id: "availability",
    title: "Website Availability",
    icon: Server,
    intro:
      "Uninterrupted access cannot be guaranteed. Temporary downtime may result from:",
    items: [
      "Server maintenance",
      "Technical upgrades",
      "Internet issues",
      "Cybersecurity measures",
      "Events beyond our control",
    ],
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    icon: ShieldAlert,
    intro:
      "To the maximum extent permitted by law, PV Classes is not liable for direct, indirect, incidental, special, or consequential loss arising from:",
    items: [
      "Use or inability to use services",
      "Examination results",
      "Technical interruptions",
      "Data loss",
      "Third-party delivery delays",
      "Reliance on educational content",
    ],
  },
  {
    id: "responsibility",
    title: "User Responsibility",
    icon: UserCheck,
    intro: "Users are responsible for:",
    items: [
      "Verifying official notifications",
      "Protecting account credentials",
      "Using resources responsibly",
      "Confirming purchases meet individual needs",
    ],
  },
  {
    id: "ip",
    title: "Intellectual Property",
    icon: Copyright,
    intro:
      "Videos, books, PDFs, notes, tests, website design, graphics, logos, and AI content are protected by intellectual-property laws.",
    note:
      "Unauthorized copying, recording, reproduction, distribution, resale, or public sharing is prohibited.",
  },
  {
    id: "affiliation",
    title: "No Government Affiliation",
    icon: Landmark,
    intro:
      "Unless expressly stated, PV Classes is not owned, operated, endorsed, or affiliated with any government department, recruiting agency, university, board, commission, or examination authority.",
  },
  {
    id: "changes",
    title: "Changes to This Disclaimer",
    icon: RefreshCw,
    intro:
      "PV Classes may update this Disclaimer without prior notice. The latest published version applies.",
  },
  {
    id: "law",
    title: "Governing Law",
    icon: Scale,
    intro:
      "This Disclaimer is governed by applicable Indian law. Disputes fall under competent courts with jurisdiction over PV Classes’ principal place of business.",
  },
  {
    id: "contact",
    title: "Contact Us",
    icon: Mail,
    intro:
      "For questions about this Disclaimer, contact PV Classes through the official details available on our website.",
  },
];

export default function DisclaimerPage() {
  return (
    <LegalPolicyPage
      title="Disclaimer"
      eyebrow="Important educational information"
      headline={<>Prepare with clarity and realistic expectations.</>}
      description="Understand the purpose, limitations, responsibilities, and third-party considerations associated with PV Classes resources and services."
      highlights={[
        ["Educational purpose", "Resources support preparation and practice."],
        ["No result guarantee", "Outcomes depend on individual and examination factors."],
        ["Verify official sources", "Authorities remain the source for exam decisions."],
      ]}
      sections={sections}
    />
  );
}
