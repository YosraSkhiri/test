export interface PostType {
  title: string,
  id: string,
  user: {
    name: string
  }
}

interface CommunPostsType {
  posts: Array<PostType>,
  totalCount?: number,
}

export interface PostsType extends CommunPostsType {}

export interface AuthorPostsType extends CommunPostsType {
  user?: {
    name: string
  },
}

export type CombinedPostsType = PostsType & AuthorPostsType;