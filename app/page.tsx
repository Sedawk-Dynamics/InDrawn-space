import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import EasySection from "@/components/easy-section"
import StatsSection from "@/components/stats-section"
import DesignsSection from "@/components/designs-section"
import WhyUsSection from "@/components/why-us-section"
import TestimonialsSection from "@/components/testimonials-section"
import PartnersSection from "@/components/partners-section"
import DesignersSection from "@/components/designers-section"
import GuidesSection from "@/components/guides-section"
import ExperienceSection from "@/components/experience-section"
import FoundedSection from "@/components/founded-section"
import MissionVisionSection from "@/components/mission-vision-section"
import DesignGallerySection from "@/components/design-gallery-section"
import Footer from "@/components/footer"

export default function Home() {
  return (

    <main className="overflow-x-hidden pb-[max(6rem,env(safe-area-inset-bottom))]">
      <Navbar />
      <HeroSection />
      <EasySection />
      <StatsSection />
      <DesignsSection />
      <DesignGallerySection />
      <WhyUsSection />
      <TestimonialsSection />
      <MissionVisionSection />
      <PartnersSection />
      <DesignersSection />
      <GuidesSection />
      <ExperienceSection />
      {/* <FoundedSection /> */}
      <Footer />
    </main>
  )
}
