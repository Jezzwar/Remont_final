import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import Testimonials from '@/components/Testimonials'
import ProcessAndFAQ from '@/components/ProcessAndFAQ'
import { CinematicFooter } from '@/components/ui/cinematic-footer'

const Divider = () => (
  <div className="w-full h-px bg-white/[0.12]" />
)

export default function HomePage() {
  return (
    <>
      {/* Main content — sits above the fixed cinematic footer */}
      <div className="relative z-10 bg-graphite">
        <Navbar />
        <Hero />
        <Divider />
        <Services />
        <Divider />
        <Portfolio />
        <Testimonials />
        <Divider />
        <ProcessAndFAQ />
      </div>

      {/* Footer reveals underneath as you scroll to the bottom */}
      <CinematicFooter />
    </>
  )
}
