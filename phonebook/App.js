import React, { useState, useEffect} from 'react'
import phonebookService from './services/phonebook'
import Person from './components/Person'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState ('')
  const [newFilter, setNewFilter] = useState('')
  const [siteMessage,setSiteMessage] = useState(null)
  const [siteMessageType, setSiteMessageType] = useState(null)


  useEffect(() => {
    phonebookService
    .getAll()
    .then(initialPerson => {
      setPersons(initialPerson)
    })
  },[])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    } 
  const existing_names = persons.map(person =>person.name)
  if (existing_names.includes(newName)) {
    const msg =`${newName} is already in the phonebook, replace? `
    const confirm = window.confirm(msg)
    if (confirm) {
      updateName(personObject)
    }
  } else {
  phonebookService
  .create(personObject)
  .then(returnedPerson => {
    setPersons(persons.concat(returnedPerson))
    setNewName('')
    setNewNumber('')
    setSiteMessage(`Added ${returnedPerson.name}`)
    setSiteMessageType ('info')
    setTimeout(() => {
      setSiteMessage(null)
    },5000)
  })
}
  }


  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
   
  }

  const deleteName = (person) =>{
    const message = `delete ${person.name}?`
    const confirm = window.confirm(message)
    if (confirm) {
      phonebookService
      .deletePerson(person.id)
      .then(persons =>
        setPersons(persons))
    }
  }

  const updateName = (personObject) => {
    const update_person = persons.find(p => p.name === personObject.name)
    const update_id = update_person.id
    phonebookService
    .update(update_id, personObject)
    .then(returnedPerson =>
      setPersons(persons.map(person => person.id !== update_id ? person : returnedPerson))
    )
    .catch(error => {
      setSiteMessage(`Note ${personObject.name} not found. ${error}`)
      setSiteMessageType('error')
      setTimeout(() => {
        setSiteMessage(null)
      }, 5000)
      setPersons(persons.filter(p => p.id !== update_id))
    })
  }

  const personsToShow = newFilter ?
  persons.filter(person => person.name.toLowerCase().includes(newFilter)):
  persons
    
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification msg = {siteMessage} type = {siteMessageType} />
      filter shown with <input value={newFilter} onChange = {handleFilterChange} />

      <h2>add a  new</h2>
      <form onSubmit ={addPerson}>
        <div>
          name: <input value = {newName} onChange = {handlePersonChange} /> <br></br>
          number:<input value = {newNumber} onChange = {handleNumberChange}/>
      
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      
       <ul>
        {personsToShow.map(person =>
        <Person key = {person.name} person = {person} deleteEntry = {() =>deleteName(person)} />
      )}
        </ul> 
      
    </div>
  )
}


export default App