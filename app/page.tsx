import CTA from "@/components/CTA";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-indigo-100">
      <main className="flex-grow">
        <Hero />
        <Features />
        <CTA />
      </main>
    </div>
  )
}

