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


// Get all persons
app.get('/api/persons', (_, res, next) => {
    Person.find({})
        .then(persons => res.json(persons))
        .catch(error => next(error))
})

// Get one person by id
app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            // Guard clause for no matching id
            if (!person) {
                res.sendStatus(404)
                return
            }

            res.json(person)
        })
        .catch(error => next(error))
})

// Create new person
app.post('/api/persons', (req, res, next) => {
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

    newPerson.save()
        .then(result => res.json(result))
        .catch(error => next(error))
})

// Update person by name
app.put('/api/persons/:id', (req, res, next) => {
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

    Person.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            number: req.body.number
        },{runValidators: true})
        .then(result => res.json(result))
        .catch(error => next(error))
})


// Delete person by id
app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(() => res.sendStatus(204))
        .catch(error => next(error))
})

// Get generic info
app.get('/info', (req, res, next) => {
    Person.countDocuments({})
        .then(count => res.send(`<p>Phonebook has info for ${count} people</p><p>${new Date().toString()}</p>`))
        .catch(error => next(error))
})

// Handle errors
const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'ValidationError') {
        res.status(400).json({error: error.message})
    }

    if (error.name === 'MongoServerError' && error.code === 11000) {
        res.static(400).json({error: "Duplicate name."})
    }

    next(error)
}

app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port ${port}`))
