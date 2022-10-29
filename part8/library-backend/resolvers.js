const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { PubSub } = require('graphql-subscriptions')
const { AuthenticationError, UserInputError } = require('apollo-server-core')
const pubsub = new PubSub()
const JWT_SECRET = process.env.JWT_SECRET ?? 'test-secret'

const resolvers = {
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  },
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
      if (!context.currentUser)
        throw new AuthenticationError('not authenticated')
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
      await newBook.populate('author')
      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
      return newBook
    },
    editAuthor: async (_root, { name, setBornTo }, context) => {
      if (!context.currentUser)
        throw new AuthenticationError('not authenticated')
      const author = await Author.findOne({ name })
      if (!author)
        throw new UserInputError('Cannot find specified author.', {
          invalidArgs: args
        })
      author.born = setBornTo
      return author.save()
    }
  },
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (_root, { genre, author }) => {
      let filter = {}
      if (genre) filter.genres = genre
      if (author) {
        const foundAuthor = await Author.findOne({ name: author })
        filter.author = foundAuthor._id
      }
      return Book.find(filter).populate('author')
    },
    allGenres: async () => Book.distinct('genres'),
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

module.exports = resolvers
