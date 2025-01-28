import { Zap, MessageSquare, ShieldCheck } from "lucide-react"

const features = [
  {
    name: "AI-Powered Fracture Detection",
    description:
      "Our advanced machine learning model accurately detects and analyzes bone fractures from X-ray images.",
    icon: Zap,
  },
  {
    name: "Intelligent Chatbot Support",
    description: "Get instant answers about fractures, treatments, and recovery through our AI-driven chatbot.",
    icon: MessageSquare,
  },
  {
    name: "Secure and Compliant",
    description: "Your data is protected with state-of-the-art security measures, ensuring HIPAA compliance.",
    icon: ShieldCheck,
  },
]

export default function Features() {
  return (
    <div className="py-12 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Cutting-edge technology for orthopedic care
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our platform combines AI-powered fracture detection with intelligent chat support to revolutionize patient
            care.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-purple-800">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-purple-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

