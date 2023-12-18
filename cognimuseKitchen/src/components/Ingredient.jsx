import React from 'react'
import '../styles/ingredientStyle.css'

function Ingredient(props) {

  const handleError = (e) => {
    e.target.src = "https://th.bing.com/th/id/OIG.YfPOt_1J.fWA6ORr_948?pid=ImgGn&w=1024&h=1024&rs=1"
  }

  return (
    <div>
        <img src={props.value[0]} className="ingredient-img" onError={handleError}></img>
        <h3>{props.value[1]}</h3>
    </div>
  )
}

export default Ingredient