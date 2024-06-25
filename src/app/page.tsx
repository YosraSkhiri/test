import { posts } from '@/api';
import { PostCard } from '@/components'
import { postType } from '@/types';
import { nanoid } from 'nanoid';

export default async function Home() {
  const allPosts = await posts.getAllPosts()

  return (
    <div>
      {
        allPosts.posts.map((post: postType) => (
          <PostCard 
            key={nanoid()}
            title={post.title}
            author={post.user.name}
            date='Jun 22, 2024'
            link={`/post/${post.id}`}
          />
        ))
      }
      
    </div>
  );
}
