import { ContactSection } from "@/components/contact/ContactSection";
import { SocialSection } from "@/components/contact/SocialSection";

export default function ContactPage() {
  return (
    <div className="space-y-12">
      <ContactSection />
      <SocialSection />
    </div>
  );
}
