import React from 'react'
import Person from './Person'

const Persons = ({persons, deletePerson}) => {
    return (
        <div>
            <h2>Numbers</h2>
            {persons.map(person => <Person key={person.id} person={person} deletePerson={deletePerson} />)}
        </div>
    )
}

export default Persons