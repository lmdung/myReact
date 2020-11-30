import React, { useState } from 'react';
import './App.css';
import Person from './Person/Person'

const app = props => {
  const [personsState, setPersonsState] = useState({
    persons: [
      {name: "Max", age: "10"},
      {name: "Menu", age: "14"},
      {name: "Mai", age: "30"}

    ]
  })
  const switchNameHandler = () => {
    console.log('was clicked')
    setPersonsState({persons: [
      {name: "Maximum", age: "10"},
      {name: "Menu", age: "14"},
      {name: "Mai", age: "15"}
    ]})
  }
  return (
    <div className="App">
      <h1>hello</h1>
      <button onClick={switchNameHandler}>Switch name</button>
      <Person name={personsState.persons[0].name} age={personsState.persons[0].age}/>
      <Person name={personsState.persons[1].name} age={personsState.persons[1].age}>My hobbies: Racing</Person>
      <Person name={personsState.persons[2].name} age={personsState.persons[2].age}/>
    </div>
  );
}
export default app;
