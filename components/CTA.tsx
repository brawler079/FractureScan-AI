import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CTA() {
  return (
    <div className="bg-gradient-to-r from-teal-600 to-teal-600">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Ready to revolutionize your practice?</span>
          <span className="block mt-2">Start using FractureScan AI today.</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-teal-200">
          Join healthcare providers worldwide who are improving patient outcomes with our AI-powered platform.
        </p>
        <Button asChild size="lg" className="mt-8 w-full sm:w-auto bg-white text-teal-600 hover:bg-teal-50">
          <Link href="/sign-up">Sign up for free</Link>
        </Button>
      </div>
    </div>
  )
}

