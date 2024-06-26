import createApolloClient from '@/client'
import { postType } from '@/types'
import { gql } from '@apollo/client'

const client = createApolloClient()

const getAllPosts = async (page = 1, limit = 8) => {
  const { data } = await client.query({
    query: gql`
      query ($page: Int, $limit: Int) {
        posts(options: { paginate: {page: $page, limit: $limit}}) {
          data {
            id
            title
            user {
              id
              name
              username
              email
            }
          }
          meta {
            totalCount
          }
        }
      }
    `,
    variables: {page, limit}
  })

  return {
    posts: data.posts.data,
    totalCount: data.posts.meta.totalCount
  }
}

const getPostById = async (id: string) => {
  const { data } = await client.query({
    query: gql`
      query {
        post(id: ${id}) {
          id
          title
          body
          user {
            id
            name
            username
            email
          }
        }
      }
    `
  })

  return {
    post: data.post
  }
}

const searchPostsByTitle = async (title: string) => {
  const { data } = await client.query({
    query: gql`
      query {
        posts {
          data {
            id
            title
            user {
              id
              name
            }
          }
        }
      }
    `,
  })

  const filteredPosts = data.posts.data.filter((post: postType) =>
    post.title.toLowerCase().includes(title.toLowerCase())
  );

  return {
    posts: filteredPosts,
  }
}

const getPostsByAuthor = async (id: string, page = 1, limit = 8) => {
  const { data } = await client.query({
    query: gql`
      query ($id: ID!, $page: Int, $limit: Int) {
        user(id: $id) {
          id
          name
          posts(options: { paginate: { page: $page, limit: $limit } }) {
            data {
              id
              title
            }
            meta {
              totalCount
            }
          }
        }
      }
    `,
    variables: { id, page, limit }
  })

  return {
    posts: data.user.posts.data,
    user: {
      id: data.user.id,
      name: data.user.name,
    },
    totalCount: data.user.posts.meta.totalCount,
  }
}

export {
  getPostsByAuthor,
  getAllPosts,
  getPostById,
  searchPostsByTitle,
}
