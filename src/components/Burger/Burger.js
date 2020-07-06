import React from 'react'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import './Burger.css'

const Burger = (props) => {
    console.log(props)
    let transformedIngredients = Object.keys(props.ingredients).map( //[salad, meat, ..]
        ingredientName => {
            return [...Array(props.ingredients[ingredientName])] //create empty array with size of required
                .map((_, i) => {  //any value of element in array, index of the element
                    return <BurgerIngredient key={ingredientName + i} type={ingredientName} />
                })
        })
        .reduce((arr, el) => {  //flatten of array
            return arr.concat(el)
        }, []);
    // console.log(transformedIngredients)  //Can check before/after reduce()

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please Start Adding Ingredients</p>
    }

    return (
        <div className='Burger'>
            <BurgerIngredient type='bread-top' />
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>

    )
}

export default Burger

