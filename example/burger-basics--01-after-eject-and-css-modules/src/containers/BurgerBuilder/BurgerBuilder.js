import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary'

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}
class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
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
    alert('You continue !')
  }

  render() {
    const disabledInfor = {...this.state.ingredients};
    for (let key in disabledInfor) {
      disabledInfor[key] = disabledInfor[key] <= 0; // true or false
    }
    // console.log(disabledInfor)
    return (
      // use shouldComponentUpdate in Modal to update the OrderSummary because OrderSummary wrapped by Modal
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}> 
          <OrderSummary 
          ingredients={this.state.ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          price={this.state.totalPrice}/>
        </Modal>
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
  }
}

export default BurgerBuilder;