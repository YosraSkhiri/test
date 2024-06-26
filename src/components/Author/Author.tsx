import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import AuthorProps from './Author.types'

const Author = ({
  image,
  author
}: AuthorProps) => {
  const getInitials = () => {
    const nameArr = author.split(' ')
    return `${nameArr[0].charAt(0).toUpperCase()}${nameArr[1].charAt(0).toUpperCase()}`
  }

  return (
    <div className='flex gap-2 items-center'>
      <Avatar>
        <AvatarImage src={image} />
        <AvatarFallback>{getInitials()}</AvatarFallback>
      </Avatar>
      <div>{author}</div>
    </div>
  )
}

export default Author