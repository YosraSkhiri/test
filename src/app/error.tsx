'use client'
 
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Something went wrong!
      </h1>
      <Button 
        className='my-10'
        onClick={
          () => reset()
        }
      >
        <Link href="/">Try again</Link>
      </Button>
    </div>
  )
}
