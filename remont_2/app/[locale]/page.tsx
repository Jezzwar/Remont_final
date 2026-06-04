import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import Process from '@/components/Process'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

const Divider = () => (
  <div className="w-full h-px bg-white/[0.12]" />
)

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Divider />
      <Services />
      <Divider />
      <Portfolio />
      <Divider />
      <Process />
      <Divider />
      <FAQ />

      <Footer />
    </>
  )
}
