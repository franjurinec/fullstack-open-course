const express = require('express')
const app = express()

const port = process.env.PORT ?? 3001

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (_, res) => res.json(persons))

app.get('/api/persons/:id', (req, res) => {
    const targetId = Number(req.params.id)
    const matchingPerson = persons.find(person => person.id === targetId)
    
    // Guard clause for no matching id
    if (!matchingPerson) {
        res.sendStatus(404)
        return
    }

    res.json(matchingPerson)
})

app.delete('/api/persons/:id', (req, res) => {
    const targetId = Number(req.params.id)
    persons = persons.filter(person => !(person.id === targetId))
    res.sendStatus(204)
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date().toString()}</p>`)
})

app.listen(port, () => console.log(`Server running on port ${port}`))
