import './App.css'
import Home from './components/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import React, { useState, useEffect } from 'react'
import Recipes from './components/Recipes';
import About from './components/About';
import Details from './components/Details';
import axios from 'axios';
import Favorites from './components/Favorites';
import NotFound from './components/NotFound';

function App() {

  const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem("isLoggedInKey"));
  const [foodList, setFoodList] = useState([]);

  const loggedInState = {
    "isLoggedIn": isLoggedIn,
    "setLoggedIn": setLoggedIn
  }

  useEffect(() => {

    axios.get('http://localhost:4000/getNames')
      .then(res => {
        console.log(res);
        setFoodList(res.data.recipeList)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home loggedInState={loggedInState} />} />
        <Route path="/login" element={<Login loggedInState={loggedInState} />} />
        {/* <Route path="/contact" element={<Contact />} />
    <Route path="*" element={<NotFound />} /> */}
        <Route path="/recipes" element={<Recipes loggedInState={loggedInState}></Recipes>} />
        <Route path="/fav" element={<Favorites loggedInState={loggedInState}></Favorites>} />
        <Route path="/about" element={<About loggedInState={loggedInState}></About>} />
        {
          foodList.map((value, index) => {
            // console.log(value)
            return <Route key={index} path={`/details/${value}`} element={<Details loggedInState={loggedInState} foodName={value}></Details>} />
          })
        }
        <Route path="*" element={<NotFound loggedInState={loggedInState}></NotFound>} />

      </Routes>
    </BrowserRouter>

  )
}

export default App
