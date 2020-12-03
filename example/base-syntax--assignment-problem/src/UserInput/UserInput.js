import React from 'react';

const UserInput = props => {
  const inputStyle = {
    border: '1px solid #ccc',
    padding: "10px",
    borderRadius: "5px",
    marginBottom: '20px'
  }
  return (
    <div>
      <input 
        style={inputStyle}
        type="text" 
        onChange={props.changed} 
        value={props.currentName}/>
    </div>
  )
}

export default UserInput;