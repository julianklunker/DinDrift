import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import Hero from "@/components/sections/Hero"
import Solutions from "@/components/sections/Solutions"
import Custom from "@/components/sections/Custom"
import About from "@/components/sections/About"
import Contact from "@/components/sections/Contact"
import Chatbot from "@/components/Chatbot"

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Solutions />
      <Custom />
      <About />
      <Contact />
      <Footer />
      <Chatbot />
    </main>
  )
}
