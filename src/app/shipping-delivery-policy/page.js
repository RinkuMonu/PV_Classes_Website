import {
  Package,
  Clock3,
  Truck,
  CreditCard,
  MapPin,
  Search,
  House,
  PackageCheck,
  CloudRain,
  Ban,
  Globe2,
  ShieldCheck,
  Mail,
  RefreshCw,
} from "lucide-react";
import LegalPolicyPage from "../../components/LegalPolicyPage";

const sections = [
  {
    id: "scope",
    title: "Scope",
    icon: Package,
    intro:
      "This policy applies only to physical products sold through PV Classes.",
    items: [
      "Printed books",
      "Printed study materials",
      "Educational kits",
      "Other physical learning resources",
    ],
    note:
      "Online courses, recorded lectures, PDFs, test series, and AI Mock Interviews are delivered electronically and are not covered by this shipping policy.",
  },
  {
    id: "processing",
    title: "Order Processing",
    icon: Clock3,
    intro:
      "Orders are generally processed within 1–2 business days after successful payment confirmation.",
    items: [
      "Sunday and public-holiday orders may be processed the next working day.",
      "Major sales, examinations, and festive periods may require additional processing time.",
    ],
  },
  {
    id: "timeline",
    title: "Shipping Timeline",
    icon: Truck,
    intro: "Estimated delivery time after dispatch:",
    items: [
      "Metro cities: 2–5 business days",
      "Tier-2 and Tier-3 cities: 3–7 business days",
      "Remote locations: 5–10 business days",
    ],
    note:
      "Timelines are estimates and may vary depending on the courier partner and local conditions.",
  },
  {
    id: "charges",
    title: "Shipping Charges",
    icon: CreditCard,
    intro:
      "Applicable shipping charges are displayed during checkout before payment.",
    note:
      "PV Classes may offer free shipping through promotions or on eligible orders.",
  },
  {
    id: "couriers",
    title: "Courier Partners",
    icon: Truck,
    intro:
      "We select an authorized courier based on service availability and the delivery location.",
    items: [
      "Delhivery",
      "Blue Dart",
      "DTDC",
      "Xpressbees",
      "India Post",
      "Other authorized partners",
    ],
  },
  {
    id: "tracking",
    title: "Order Tracking",
    icon: Search,
    intro: "After dispatch, you may receive:",
    items: [
      "Tracking ID or AWB number",
      "Courier partner details",
      "Shipment confirmation by email, SMS, or WhatsApp where applicable",
    ],
  },
  {
    id: "address",
    title: "Delivery Address",
    icon: MapPin,
    intro:
      "Customers must provide a complete and accurate shipping address.",
    items: [
      "Correct address",
      "Correct PIN code",
      "Active mobile number",
      "Recipient availability",
    ],
    note:
      "PV Classes is not responsible for failed or delayed delivery caused by incorrect details. Reshipment may incur additional charges.",
  },
  {
    id: "attempts",
    title: "Delivery Attempts",
    icon: House,
    intro:
      "Courier partners generally make multiple delivery attempts. Undeliverable shipments may be returned to PV Classes.",
    note: "Re-dispatch may be subject to additional shipping charges.",
  },
  {
    id: "damaged",
    title: "Damaged or Incorrect Products",
    icon: PackageCheck,
    intro:
      "Contact us within 7 days if an item is damaged, defective, incorrect, or has missing pages or manufacturing defects.",
    items: [
      "Order ID",
      "Clear product and packaging photographs",
      "Description of the issue",
    ],
    note:
      "After verification, PV Classes may arrange a replacement or another suitable resolution.",
  },
  {
    id: "delays",
    title: "Delivery Delays",
    icon: CloudRain,
    intro:
      "PV Classes is not liable for delays beyond its reasonable control, including:",
    items: [
      "Natural disasters or heavy rainfall",
      "Strikes and government restrictions",
      "Public holidays",
      "Transport disruptions",
      "Courier technical issues",
    ],
  },
  {
    id: "refusal",
    title: "Refusal to Accept Delivery",
    icon: Ban,
    intro:
      "If delivery is refused without a valid reason, shipping, return, or handling charges may be deducted from any eligible refund under the Refund Policy.",
  },
  {
    id: "international",
    title: "International Shipping",
    icon: Globe2,
    intro:
      "PV Classes currently delivers primarily within India.",
    note:
      "If international shipping becomes available, charges, customs duties, taxes, and timelines will be shown during checkout.",
  },
  {
    id: "ownership",
    title: "Ownership & Risk",
    icon: ShieldCheck,
    intro:
      "Product ownership passes to the customer upon successful delivery. Transit risk remains with the courier partner until delivery is completed.",
  },
  {
    id: "contact",
    title: "Contact Us",
    icon: Mail,
    intro:
      "For delivery assistance, contact our official support channels and provide:",
    items: [
      "Order ID",
      "Registered mobile number",
      "Registered email address",
      "Tracking number, if available",
      "Description of the issue",
    ],
  },
  {
    id: "updates",
    title: "Policy Updates",
    icon: RefreshCw,
    intro:
      "PV Classes may modify this policy at any time. The latest published version will apply.",
  },
];

export default function ShippingDeliveryPolicy() {
  return (
    <LegalPolicyPage
      title="Shipping & Delivery Policy"
      eyebrow="Safe delivery across India"
      headline={<>Learning resources, delivered with care.</>}
      description="Understand order processing, delivery timelines, tracking, courier responsibilities, and support for physical PV Classes products."
      highlights={[
        ["1–2 day processing", "Orders are prepared promptly after payment confirmation."],
        ["Trackable delivery", "Dispatch details and tracking may be shared digitally."],
        ["7-day issue window", "Report damaged or incorrect physical items promptly."],
      ]}
      sections={sections}
    />
  );
}
