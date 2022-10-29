const { gql } = require('apollo-server')

const typeDefs = gql`
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    bookCount: Int!
    id: ID!
    born: Int
  }

  type Mutation {
    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!): Token
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }

  type Query {
    me: User
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allGenres: [String!]!
    authorCount: Int!
    allAuthors: [Author!]!
  }

  type Subscription {
    bookAdded: Book!
  }
`

module.exports = typeDefs
