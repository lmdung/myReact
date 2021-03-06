import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
  
  let transformedIngredient = Object.keys(props.ingredients)
    .map(igKey => {
      // Array(i) tạo array có i item
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient type={igKey} key={igKey + i}/>
      })
    })
    .reduce((arr, el) => {
      return arr.concat(el)
    }, [])
  if (transformedIngredient.length === 0) {
    transformedIngredient = <p>Please start adding ingredient !</p>
  }
  // console.log(transformedIngredient)
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"/>
      {transformedIngredient}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  )
}
export default burger;