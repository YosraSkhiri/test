import { Button } from '@/components/ui/button'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Not Found
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Could not find requested resource
      </p>
      <Button className='my-10'>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  )
}
