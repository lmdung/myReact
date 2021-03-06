import React, { Component } from 'react';
import './App.css';
import Validation from './Validation/Validation';
import Char from './Char/Char';
class App extends Component {
  state = {
    text: ''
  };
  onChangeHandler = (event) => {
    this.setState({text: event.target.value})
  }
  onClickCharHandler = (index) => {
    let textArray = this.state.text.split('');
    textArray.splice(index, 1);
    let textJoined = textArray.join('');
    this.setState({text: textJoined})
  }
  render() {
    let text = this.state.text
    let lengthText = text.length;
    let listLetter = null;
    if (lengthText) {
      listLetter = (
        this.state.text.split('').map((letter, index) => {
          return (
            <Char
            key={index}
            click={() => this.onClickCharHandler(index)}
            letter={letter}/>)
        })
      )
    }
    return (
      <div className="App">
        <ol>
          <li>Create an input field (in App component) with a change listener which outputs the length of the entered text below it (e.g. in a paragraph).</li>
          <li>Create a new component (=> ValidationComponent) which receives the text length as a prop</li>
          <li>Inside the ValidationComponent, either output "Text too short" or "Text long enough" depending on the text length (e.g. take 5 as a minimum length)</li>
          <li>Create another component (=> CharComponent) and style it as an inline box (=> display: inline-block, padding: 16px, text-align: center, margin: 16px, border: 1px solid black).</li>
          <li>Render a list of CharComponents where each CharComponent receives a different letter of the entered text (in the initial input field) as a prop.</li>
          <li>When you click a CharComponent, it should be removed from the entered text.</li>
        </ol>
        <p>Hint: Keep in mind that JavaScript strings are basically arrays!</p>
        <div>
          <input onChange={this.onChangeHandler} value={text}></input>
          <p>{lengthText}</p>
          <Validation length={lengthText}></Validation>
          {listLetter}
        </div>
      </div>
    );
  }
}

export default App;
