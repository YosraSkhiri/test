"use client"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { useRouter } from 'next/navigation'

import PostCardProps from './PostCard.types'
import { StarIcon } from '@radix-ui/react-icons'

const PostCard = ({
  title,
  date,
  author,
  image,
  link,
}: PostCardProps) => {
  const router = useRouter()

  const getInitials = () => {
    const nameArr = author.split(' ')
    return `${nameArr[0].charAt(0).toUpperCase()}${nameArr[1].charAt(0).toUpperCase()}`
  }

  return (
    <div className='flex max-w-2xl flex-col gap-5 p-5 rounded-3xl border'>
      <div>
        <h3 className="mb-2.5 scroll-m-20 text-2xl font-semibold tracking-tight text-card-foreground">
          {title}
        </h3>
        <small className="text-sm font-medium leading-none">
          {date}
        </small>
      </div>
      
      <div className='flex gap-2 items-center'>
        <Avatar>
          <AvatarImage src={image} />
          <AvatarFallback>{getInitials()}</AvatarFallback>
        </Avatar>
        <div>{author}</div>
      </div>
      
      <div className='flex gap-2 items-center'>
        <Button onClick={() => router.push(link)}>Read more</Button>
        <Button variant="outline" size="icon">
          <StarIcon />
        </Button>
      </div>
    </div>
  )
}

export default PostCard
