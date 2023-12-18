import React from 'react'
import Header from './Header'
import Footer from './Footer'
import ListRecipe from './ListRecipe'

function Recipes(props) {
  return (
    <>
        <Header loggedInState = {props.loggedInState}></Header>
        <ListRecipe></ListRecipe>
        <Footer></Footer>
    </>
  )
}

export default Recipes