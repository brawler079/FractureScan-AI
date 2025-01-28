import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-purple-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          <div className="px-5 py-2">
            <Link href="#" className="text-base text-purple-200 hover:text-white">
              About
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="#" className="text-base text-purple-200 hover:text-white">
              Blog
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="#" className="text-base text-purple-200 hover:text-white">
              Privacy Policy
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="#" className="text-base text-purple-200 hover:text-white">
              Terms of Service
            </Link>
          </div>
        </nav>
        <p className="mt-8 text-center text-base text-purple-200">
          &copy; {currentYear} FractureScan AI. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

