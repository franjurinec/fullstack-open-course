require('dotenv').config()
const jwt = require('jsonwebtoken')
const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET ?? 'test-secret'

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

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
    authorCount: Int!
    allAuthors: [Author!]!
  }
`

const resolvers = {
  Mutation: {
    createUser: async (_root, args) => {
      const user = new User(args)

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      })
    },
    login: async (_root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
    addBook: async (_root, args, context) => {
      if (!context.currentUser) return null
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        const newAuthor = new Author({ name: args.author })
        author = await newAuthor.save().catch((_error) => {
          throw new UserInputError(
            'Invalid author name. (must be unique and at least 4 characters long)',
            {
              invalidArgs: args
            }
          )
        })
      }
      const newBook = new Book({ ...args, author: author._id })
      await newBook.save().catch((_error) => {
        throw new UserInputError(
          'Invalid book info. (title must be unique and at least 2 characters long)',
          {
            invalidArgs: args
          }
        )
      })
      return newBook.populate('author')
    },
    editAuthor: async (_root, { name, setBornTo }) => {
      if (!context.currentUser) return null
      const author = await Author.findOne({ name })
      if (!author) return null
      author.born = setBornTo
      return author.save()
    }
  },
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (_root, { genre }) => {
      let filter = {}
      if (genre) filter.genres = genre
      return Book.find(filter).populate('author')
    },
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async () => Author.find({}),
    me: (_root, _args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => Book.countDocuments({ author: root.id })
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
