import React, { Component } from 'react';
import classes from './ContactData.css';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          MaxLength: 5
        },
        valid: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'},
          ]
        },
        value: '',
      },
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    // tránh auto send data and reload page
    
    this.setState({loading : true})

    let formData = {};
    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData
    }

    console.log(order)
    axios.post('orders.json', order)
      .then(response => {
        this.setState({loading: false});
        this.props.history.push('/'); //muốn sử dụng props.history thì phải truyền props từ parent xuống
      })
      .catch(err => {
        this.setState({loading: false})
      })
  } 


  inputChangedHandler = (event, inputIdentifier) => {
    const updateOrderForm = {
      ...this.state.orderForm
    };
    // deep copy
    const updateFormElement = {
      ...updateOrderForm[inputIdentifier]
    }
    updateFormElement.value = event.target.value;
    updateFormElement.valid = this.checkValidity(updateFormElement.value, updateFormElement.validation);
    updateOrderForm[inputIdentifier] = updateFormElement;
    this.setState({orderForm: updateOrderForm});
  }

  checkValidity = (value, rules) => {
    let isValid = true; 

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }
  render() {
    let formsElementArray = [];
    for(let key in this.state.orderForm) {
      formsElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    // console.log(formsElementArray)
    let form = (
      <form onSubmit={this.orderHandler}>
        {formsElementArray.map(formElement => {
          return <Input 
            key={formElement.id} 
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.value}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}/>
        })}
        <Button btnType="Success">ORDER</Button>
      </form>
    )

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
  }
}

export default ContactData;