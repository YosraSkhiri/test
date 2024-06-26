import { posts, authors } from '@/api';
import { PostCard, SearchForm, Pagination, FilterByAuthor } from '@/components'
import { postType } from '@/types';
import { nanoid } from 'nanoid';

export default async function Home({searchParams}: {searchParams?: {q?: string, page?: string, author?: string}}) {
  const PAGE_LIMIT = 8
  const q = searchParams?.q
  const author = searchParams?.author
  let page = 1
  let allPosts

  console.log(author)

  const allAuthors = await authors.getAllAuthors()

  const isValidNumber = (str?: string) => {
    if (!str) return false

    const nb = +str
    return !(isNaN(nb) || nb.toString().length !== str.length)
  }
  
  if (q) {
    allPosts = await posts.searchPostsByTitle(q)
  } else {
    if (author) {
      allPosts = await posts.getPostsByAuthor(author)
    } else {
      if(searchParams?.page && isValidNumber(searchParams?.page)) {
        page = +searchParams.page
      }
      allPosts = await posts.getAllPosts(page, PAGE_LIMIT)
      console.log(allPosts.totalCount)
    }
    
  }

  
  return (
    <div>
      <SearchForm />
      <FilterByAuthor 
        selectedAuthor={author} 
        authors={allAuthors.authors} 
      />
      <div className='flex flex-col gap-8 justify-items-center'>
        {
          allPosts?.posts.map((post: postType) => (
            <PostCard 
              key={nanoid()}
              title={post.title}
              author={post?.user?.name ? post.user.name : allPosts?.user.name}
              date='Jun 22, 2024'
              link={`/post/${post.id}`}
              className='self-center'
            />
          ))
        }
      </div>
    </div>
  );
}
