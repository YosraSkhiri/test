import { posts } from '@/api';
import { Author } from '@/components';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export default async function Post({ params }: { params: { id: string } }) {
  const postDetails = await posts.getPostById(params.id)

  return (
    <div className='py-10'>
      <Button variant="outline">
        <Link className='flex items-center' href="/">
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back
        </Link>  
      </Button>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {postDetails.post.title}
      </h1>
      <Author 
        author={postDetails.post.user.name}
      />
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {postDetails.post.body}
      </p>
    </div>
  );
}
