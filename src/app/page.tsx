import { posts, authors } from '@/api';
import { PostCard, SearchForm, FilterByAuthor, Pagination } from '@/components'
import { CombinedPostsType, PostType } from '@/types';
import { nanoid } from 'nanoid'
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
 
export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  let title = (await parent).title as unknown as string

  const authorId = searchParams?.author as string
  const q = searchParams?.q

  if(authorId) {
    const author = await authors.getAuthorById(authorId)
    title = `${author.author.name} articles`
  }

  if(q) {
    title = `Search results for "${q}"`
  }

  return {
    title,
  }
}

export default async function Home({searchParams}: {searchParams?: {q?: string, page?: string, author?: string}}) {
  const PAGE_LIMIT = 8
  const q = searchParams?.q
  const author = searchParams?.author
  let page = 1
  let allPosts: CombinedPostsType

  const allAuthors = await authors.getAllAuthors()

  const isValidNumber = (str?: string) => {
    if (!str) return false

    const nb = +str
    return !(isNaN(nb) || nb.toString().length !== str.length)
  }
  
  if (q) {
    allPosts = await posts.searchPostsByTitle(q)
  } else {
    if(searchParams?.page && isValidNumber(searchParams?.page)) {
      page = +searchParams.page
    }
    if (author) {
      allPosts = await posts.getPostsByAuthor(author, page, PAGE_LIMIT)
    } else {
      allPosts = await posts.getAllPosts(page, PAGE_LIMIT)
    }
  }

  return (
    <div>
      <SearchForm />
      <FilterByAuthor 
        selectedAuthor={author} 
        authors={allAuthors.authors} 
      />
      {
        !q && allPosts.totalCount && (
          <Pagination 
            count={Math.ceil(allPosts.totalCount / PAGE_LIMIT)} 
            page={page}
          />
        )
      }
      <div className='flex flex-col gap-8 justify-items-center'>
        {
          allPosts?.posts.length === 0 ? 'No results found' : allPosts?.posts.map((post: PostType) => (
            <PostCard 
              key={nanoid()}
              id={post.id}
              title={post.title}
              author={author ? allPosts?.user?.name : post.user.name }
              date='Jun 22, 2024' // the api I'm using doesn't provide dates
              link={`/post/${post.id}`}
              className='self-center'
            />
          ))
        }
      </div>
    </div>
  )
}
