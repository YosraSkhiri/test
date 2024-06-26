"use client"
import { Button } from "@/components/ui/button"

import { useRouter } from 'next/navigation'

import PostCardProps from './PostCard.types'
import { StarIcon } from '@radix-ui/react-icons'
import Author from '../Author'

const PostCard = ({
  title,
  date,
  author,
  image,
  link,
  className,
}: PostCardProps) => {
  const router = useRouter()

  return (
    <div className={`w-full min-w-full ${className}`}>
      <div className="w-full flex max-w-3xl flex-col gap-5 p-5 rounded-3xl border">
        <div>
          <h3 className="mb-2.5 scroll-m-20 text-2xl font-semibold tracking-tight text-card-foreground">
            {title}
          </h3>
          <small className="text-sm font-medium leading-none">
            {date}
          </small>
        </div>
        
        <Author 
          image={image}
          author={author}
        />
        
        <div className='flex gap-2 items-center'>
          <Button onClick={() => router.push(link)}>Read more</Button>
          <Button variant="outline" size="icon">
            <StarIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PostCard
