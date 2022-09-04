import { useState, useEffect } from 'react'
import Filter from './Filter'
import Message from './Message'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personService from './services/persons'

const App = () => {
  
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const [successMessage, setSuccessMessage] = useState()
  const [errorMessage, setErrorMessage] = useState()

  const fetchPersons = () => {
    // Get persons from DB
    personService
    .getAll()
    .then(response => setPersons(response.data))
  }

  useEffect(fetchPersons, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)

  }

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    const existingPerson = persons.find(person => person.name === newPerson.name)

    if (existingPerson) {
      if(window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`))
        personService
          .update(existingPerson.id, newPerson)
          .then(response => {
            setSuccessMessage(`Updated ${response.data.name}'s number`)
            setTimeout(() => {setSuccessMessage(null)}, 5000)
          })
          .catch(error => {
            setErrorMessage(`Information of ${newPerson.name} has already been removed from the server`)
            setTimeout(() => {setErrorMessage(null)}, 5000)
          })
          .finally(fetchPersons)
      setNewName('')
      setNewNumber('')
      return
    }

    personService
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setSuccessMessage(`Added ${newPerson.name}`)
        setTimeout(() => {setSuccessMessage(null)}, 5000)
      })
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`))
      personService
        .deleteById(person.id)
        .then(_ => {
          setSuccessMessage(`Deleted ${person.name}`)
          setTimeout(() => {setSuccessMessage(null)}, 5000)
        })
        .catch(error => {
          setErrorMessage(`Information of ${person.name} has already been removed from the server`)
          setTimeout(() => {setErrorMessage(null)}, 5000)
        })
        .finally(fetchPersons)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={successMessage} type='success' />
      <Message message={errorMessage} type='error' />
      <Filter value={filter} onFilterChange={handleFilterChange} />
      <PersonForm onSubmit={addPerson} 
        newName={newName} 
        onNameChange={handleNameChange}
        newNumber={newNumber}
        onNumberChange={handleNumberChange}/>
      
      <Persons persons={personsToShow} deletePerson={deletePerson} />

    </div>
  )
}

export default App