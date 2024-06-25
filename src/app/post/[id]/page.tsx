import { posts } from '@/api';

export default async function Post({ params }: { params: { id: string } }) {
  const postDetails = await posts.getPostById(params.id)

  return (
    <div>
      {postDetails.post.title}
      {postDetails.post.body}
    </div>
  );
}
