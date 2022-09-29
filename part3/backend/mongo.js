const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fjurinec:${password}@cluster0.ediyyyk.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then(() => {

    if (process.argv.length === 3) {
      // Get all persons
      Person
        .find({})
        .then(persons => {
          console.log('phonebook:')
          persons.forEach(person => console.log(`${person.name} ${person.number}`))

          mongoose.connection.close()
        })
      return
    }

    if (process.argv.length === 5) {
      // Add new person
      const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
      })

      person.save()

      console.log(`added ${person.name} number ${person.number} to phonebook`)

      mongoose.connection.close()
      return
    }

    console.log('Invalid number of arguments!')
  })
  .catch((err) => console.log(err))