import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import axios from '../../axios-orders'

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}
class BurgerBuilder extends Component {

  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  }

  componentDidMount() {
    axios.get('https://lmdung-burger-default-rtdb.firebaseio.com/ingredients.json')
      .then((res) => {
        this.setState({ingredients: res.data})
      })
      .catch(err => {
        this.setState({error: true})
      })
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updateCount = oldCount + 1;
    const updateIngredient = {...this.state.ingredients};
    updateIngredient[type] = updateCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updateIngredient})
    this.updatePurchaseState(updateIngredient)
  }
  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updateCount = oldCount - 1;
    const updateIngredient = {...this.state.ingredients};
    updateIngredient[type] = updateCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({totalPrice: newPrice, ingredients: updateIngredient})
    this.updatePurchaseState(updateIngredient)
  }
  
  updatePurchaseState(ingredients) {
    // console.log(ingredients)
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({purchasable : sum > 0}) //true or false
    // console.log(sum)
  }
  // don't call this in traditional functions
  // purchaseHandler () {
  //   this.setState({purchasing : true})
  // }
  purchaseHandler = () => {
    this.setState({purchasing : true})
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing : false})
  }

  purchaseContinueHandler = () => {
    // alert('You continue !')
    this.setState({loading : true})
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Le Dung',
        address: {
          street: 'Giai Phong',
          zipCode: '12345',
          country: 'VN'
        },
        email: 'test@123'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('orders.json', order)
      .then(response => {
        this.setState({loading: false, purchasing: false})
      })
      .catch(err => {
        this.setState({loading: false, purchasing: false})
      })
  }

  render() {
    const disabledInfor = {...this.state.ingredients};
    for (let key in disabledInfor) {
      disabledInfor[key] = disabledInfor[key] <= 0; // true or false
    }
    // console.log(disabledInfor)
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded !</p> : <Spinner />
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls 
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfor}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}/>
        </Aux>
      )
      orderSummary = <OrderSummary 
        ingredients={this.state.ingredients}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}
        price={this.state.totalPrice}/>
    }
    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      // use shouldComponentUpdate in Modal to update the OrderSummary because OrderSummary wrapped by Modal
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}> 
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios);