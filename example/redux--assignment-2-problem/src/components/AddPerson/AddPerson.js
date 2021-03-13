import React, { Component }from 'react';

import './AddPerson.css';

class AddPerson extends Component {
    // vi du ve local UL State. K nen su dung Redux o day
    state = {
        name: '',
        age: '',
    }

    changeNameHandler = (event) => {
        this.setState({ name: event.target.value})
    }
    changeAgeHandler = (event) => {
        this.setState({ age: event.target.value})
    }
    render() {
        return (
            <div className="AddPerson">
                <input type="text"  placeholder="Name" onChange={this.changeNameHandler}/>
                <input type="text" placeholder="Age" onChange={this.changeAgeHandler}/>
                <button onClick={() => this.props.personAdded(this.state.name, this.state.age)}>Add Person</button>
            </div>
        )
    }
}

export default AddPerson;