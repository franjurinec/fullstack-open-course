var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) return undefined
  
  const mostLiked = blogs.reduce((max, current) => (max.likes > current.likes) ? max : current)

  return {
    title: mostLiked.title, 
    author: mostLiked.author, 
    likes: mostLiked.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return undefined

  const result = _(blogs)
    .countBy('author')
    .entries()
    .maxBy(_.last)

  return {
    author: result[0],
    blogs: result[1]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return undefined

  const result = _(blogs)
    .groupBy('author')
    .map((blog, author) => ({
      author,
      likes: _.sumBy(blog, 'likes')
    }))
    .maxBy('likes')

  return result
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}