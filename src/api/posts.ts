import createApolloClient from '@/client'
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

export {
  getAllPosts,
  getPostById
}