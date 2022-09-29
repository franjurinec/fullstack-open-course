require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

const port = process.env.PORT ?? 3001

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

// Custom morgan token for request body JSON
morgan.token('body-json', (req, _) => {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body-json'))


// Routes

app.get('/api/persons', (_, res) => {
    Person.find({})
        .then(persons => res.json(persons))
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id)
        .then(person => {

            if (!person) {
                res.sendStatus(404)
                return
            }

            res.json(person)
        })
        .catch((err) => {
            console.log(err)
            res.sendStatus(400)
        })
})

app.post('/api/persons', (req, res) => {
    // Guard clause for missing name
    if (!req.body.name) {
        res.status(400)
        res.json({ error: "name must be defined" })
        return
    }

    // Guard clause for missing number
    if (!req.body.number) {
        res.status(400)
        res.json({ error: "number must be defined" })
        return
    }

    const newPerson = new Person({
        name: req.body.name,
        number: req.body.number
    })

    newPerson.save().then(result => res.json(result))
})

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.sendStatus(204)
        })
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date().toString()}</p>`)
})

app.listen(port, () => console.log(`Server running on port ${port}`))
