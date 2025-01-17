import createApolloClient from '@/client'
import { gql } from '@apollo/client'

const client = createApolloClient()

const getAllAuthors = async () => {
  const { data } = await client.query({
    query: gql`
      query {
        users {
          data {
            id
            username
            name
          }
        }
      }
    `,
  })

  return {
    authors: data.users.data,
  }
}

const getAuthorById = async (id: string) => {
  const { data } = await client.query({
    query: gql`
      query {
        user(id: ${id}) {
          id
          name
        }
      }
    `,
  })

  return {
    author: data.user,
  }
}

export {
  getAllAuthors,
  getAuthorById,
}