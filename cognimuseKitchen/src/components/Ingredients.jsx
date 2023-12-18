import React from 'react'
import Ingredient from './Ingredient';
import Card from './Card';
import '../styles/ingredientsStyle.css'

function Ingredients(props) {
    const ingredients = props.Ingredients

    return (
        <div className='ingredients'>
            {
                ingredients.map((value, index) => <Ingredient key={index} value={value}></Ingredient>)
            }
        </div>
    )
}

export default Ingredients