import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-b from-purple-400/10 to-purple-200/10'>
          <SignIn />
        </div>
  )
}