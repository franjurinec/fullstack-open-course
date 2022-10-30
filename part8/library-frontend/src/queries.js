import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
    }
    published
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
      genres
    }
  }

  ${BOOK_DETAILS}
`

export const ALL_GENRES = gql`
  query {
    allGenres
  }
`

export const BOOKS_BY_GENRE = gql`
  query booksAndGenres($genre: String) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`

export const FAVOURITE_GENRE = gql`
  query {
    me {
      favouriteGenre
    }
  }
`

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
