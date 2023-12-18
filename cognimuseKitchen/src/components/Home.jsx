import React from 'react'
import Header from './Header'
import Body from './Body'
import Footer from './Footer'
import '../styles/homeStyle.css'

function Home(props) {
  console.log(props)
  return (
    <>
      <Header loggedInState = {props.loggedInState}></Header>
      <Body loggedInState = {props.loggedInState}></Body>
      <Footer></Footer>
    </>
  )
}

export default Home