import React from 'react';
import './UserOutput.css'
const UserOutput = props => {
  return (
    <div className="UserOutput">
      <p>Hello i'm {props.username}</p>
      <p>I'm 10 years old</p>
    </div>
  )
}

export default UserOutput;