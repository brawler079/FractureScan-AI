import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="footer" className="bg-teal-900 text-teal-100">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <p className="text-lg font-medium">
            Designed & Built by{" "}
            <a
              href="mailto:anandabhilakshay@gmail.com"
              className="underline hover:text-white transition-colors cursor-pointer"
            >
              Abhilakshay Anand
            </a>{" "}
            &{" "}
            <a
              href="mailto:praneethvarma03@gmail.com"
              className="underline hover:text-white transition-colors cursor-pointer"
            >
              Praneeth Varma
            </a>
          </p>

          <p className="text-sm text-teal-300">
            &copy; {currentYear} <span className="font-semibold">FractureScan AI</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
