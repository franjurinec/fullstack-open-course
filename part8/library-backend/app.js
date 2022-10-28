require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

const MONGODB_URI = process.env.MONGODB_URI

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
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
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }

  type Query {
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    authorCount: Int!
    allAuthors: [Author!]!
  }
`

const resolvers = {
  Mutation: {
    addBook: async (_, args) => {
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        const newAuthor = new Author({ name: args.author })
        try {
          author = await newAuthor.save()
        } catch (error) {
          throw new UserInputError(
            'Invalid author name. (must be unique and at least 4 characters long)',
            {
              invalidArgs: args
            }
          )
        }
      }
      const newBook = new Book({ ...args, author: author._id })
      try {
        await newBook.save()
      } catch (error) {
        throw new UserInputError(
          'Invalid book info. (title must be unique and at least 2 characters long)',
          {
            invalidArgs: args
          }
        )
      }
      return newBook.populate('author')
    },
    editAuthor: async (_, { name, setBornTo }) => {
      const author = await Author.findOne({ name })
      if (!author) return null
      author.born = setBornTo
      return author.save()
    }
  },
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (_, { genre }) => {
      let filter = {}
      if (genre) filter.genres = genre
      return Book.find(filter).populate('author')
    },
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async () => Author.find({})
  },
  Author: {
    bookCount: async (root) => Book.countDocuments({ author: root.id })
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
