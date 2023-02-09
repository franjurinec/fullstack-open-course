const express = require('express')
const app = express()

// Use port from environment variable if available
const PORT = process.env.PORT || 5000

app.use(express.static('dist'))

app.get('/health', (_, res) => {
  res.send('ok')
})

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${PORT}`)
})

// Simulate build fail
console.log(fail)
