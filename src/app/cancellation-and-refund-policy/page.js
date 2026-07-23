import {
  Layers,
  MonitorPlay,
  Radio,
  Video,
  BookOpen,
  Ban,
  CopyCheck,
  CircleAlert,
  XCircle,
  PackageCheck,
  Bot,
  BadgePercent,
  Clock3,
  CreditCard,
  RefreshCw,
  Mail,
} from "lucide-react";
import LegalPolicyPage from "../../components/LegalPolicyPage";

const sections = [
  {
    id: "scope",
    title: "Scope",
    icon: Layers,
    intro: "This policy applies to PV Classes products and services, including:",
    items: [
      "Live and recorded courses",
      "Printed books and study materials",
      "Test series and digital downloads",
      "AI Mock Interviews",
      "Mock interview programs",
      "Other educational products or services",
    ],
  },
  {
    id: "digital",
    title: "Digital Products",
    icon: MonitorPlay,
    intro:
      "Digital products become accessible after purchase, so sales are generally final.",
    items: [
      "Online courses and recorded lectures",
      "Test series",
      "PDFs and notes",
      "AI Mock Interviews",
      "Digital study materials",
    ],
    note:
      "Once access is provided, a purchase is non-refundable and non-transferable except where required by law or where PV Classes cannot provide the purchased service.",
  },
  {
    id: "live",
    title: "Live Courses",
    icon: Radio,
    intro:
      "Once live-course access is provided, refunds are not ordinarily available.",
    items: [
      "Duplicate payment for the same course may be reviewed.",
      "An unresolved PV Classes technical failure preventing access may be reviewed.",
    ],
  },
  {
    id: "recorded",
    title: "Recorded Courses",
    icon: Video,
    intro:
      "Refunds and cancellations are generally unavailable after activation.",
    note:
      "Review the syllabus, duration, language, validity, and course details carefully before purchasing.",
  },
  {
    id: "books",
    title: "Printed Books",
    icon: BookOpen,
    intro:
      "A replacement or refund may be considered for a wrong, damaged, defective, or incomplete book.",
    items: [
      "Submit the request within 7 days of delivery",
      "Provide the order ID",
      "Provide clear product photographs",
      "Describe the issue",
    ],
    note:
      "PV Classes may inspect and verify the claim before approving a resolution.",
  },
  {
    id: "not-eligible",
    title: "When Refunds Are Not Provided",
    icon: Ban,
    intro: "Refunds are generally not issued for:",
    items: [
      "Change of mind",
      "Decision not to continue",
      "Lack of study time",
      "Failure to qualify",
      "Expired course validity",
      "Accidental purchase of the wrong course",
      "Personal expectations rather than service defects",
      "Downloaded or accessed digital material",
    ],
  },
  {
    id: "duplicate",
    title: "Duplicate Payment",
    icon: CopyCheck,
    intro:
      "An additional charge for the same order will be refunded after verification.",
    note:
      "Refunds are generally processed within 7–10 business days through the original payment method.",
  },
  {
    id: "failed",
    title: "Failed Transactions",
    icon: CircleAlert,
    intro:
      "If payment is deducted but an order is not confirmed, allow up to 24 hours for automatic reconciliation.",
    note:
      "If the issue remains, contact support with your transaction details.",
  },
  {
    id: "cancellation",
    title: "Order Cancellation",
    icon: XCircle,
    intro:
      "Printed-book cancellation may be accepted only before processing or dispatch. Digital orders cannot ordinarily be cancelled after access is granted.",
  },
  {
    id: "replacement",
    title: "Replacement Policy",
    icon: PackageCheck,
    intro:
      "Books damaged in transit may be replaced after verification when requested within 7 days of delivery.",
  },
  {
    id: "ai",
    title: "AI Mock Interview",
    icon: Bot,
    intro:
      "Fees are generally non-refundable after a session begins or a report is generated.",
    note:
      "If a PV Classes technical issue prevents completion, we may offer rescheduling or another suitable resolution.",
  },
  {
    id: "offers",
    title: "Promotional Offers",
    icon: BadgePercent,
    intro:
      "Discounted, festive, promotional, and special-sale purchases remain subject to this policy unless stated otherwise.",
  },
  {
    id: "processing",
    title: "Processing Time",
    icon: Clock3,
    intro:
      "Approved refunds are generally processed within 7–10 business days. Actual credit timing depends on the bank or payment provider.",
  },
  {
    id: "method",
    title: "Refund Method",
    icon: CreditCard,
    intro:
      "Approved refunds are generally credited through the original payment method. Supporting information may be requested.",
  },
  {
    id: "updates",
    title: "Policy Updates",
    icon: RefreshCw,
    intro:
      "PV Classes may amend this policy at any time. The latest published version will apply.",
  },
  {
    id: "contact",
    title: "Contact Us",
    icon: Mail,
    intro: "For refund, replacement, or cancellation queries, provide:",
    items: [
      "Order ID",
      "Registered mobile number",
      "Registered email address",
      "Transaction reference, if applicable",
      "Description of the issue",
    ],
  },
];

export default function RefundPolicy() {
  return (
    <LegalPolicyPage
      title="Refund & Cancellation Policy"
      eyebrow="Clear and transparent resolutions"
      headline={<>Know before you purchase.</>}
      description="Understand eligibility, timelines, exceptions, and resolution options for PV Classes digital products, courses, books, and AI services."
      highlights={[
        ["Digital access", "Activated digital products are generally final."],
        ["7-day book claims", "Report eligible physical-product issues promptly."],
        ["7–10 day refunds", "Approved refunds follow the original payment mode."],
      ]}
      sections={sections}
    />
  );
}
