import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import BeforeAfter from '@/components/BeforeAfter'
import Process from '@/components/Process'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <BeforeAfter />
      <Process />
      <Testimonials />
      <FAQ />
      <ContactForm />
      <Footer />
    </>
  )
}
