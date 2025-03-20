import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <div className="bg-gradient-to-b from-teal-50 to-teal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-extrabold text-gray-900">
            <span className="block">Advanced Bone Fracture Detection</span>
            <span className="block text-teal-600 mt-2">Powered by AI</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl md:max-w-3xl text-teal-700">
            Revolutionizing orthopedic care with machine learning and real-time chat support.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Button asChild size="lg" className="w-full sm:w-auto bg-teal-600 text-white hover:bg-teal-700">
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <Button
                variant="outline"
                asChild
                size="lg"
                className="w-full sm:w-auto text-teal-600 border-teal-600 hover:bg-purple-50"
              >
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

