import React, { useEffect, useState } from 'react'
import '../styles/heroStyle.css'
import axios from 'axios';

function heroImage() {

  const [hero, setHero] = useState({
    heroPic: "https://storage.googleapis.com/aiurveda-2fb88.appspot.com/food-thumbnails/dal_fry.jpg",
    heroName: "Dal Fry"
  });
  // const a = 0;
  // const [heroName, setHeroName] = useState("Masala Dosa")

  // useEffect(() => {
  //   axios.get("http://localhost:4000/hero")
  //     .then(res => {
  //       console.log(res)
  //       setHero({heroPic : res.data.heroPic, heroName : res.data.heroName})
  //       // console.log(heroPic, heroName)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }, []);


  const handleError = (e) => {
    e.target.src = "https://storage.googleapis.com/aiurveda-2fb88.appspot.com/food-thumbnails/masala_dosa.jpg";
    setHero(prevState => ({
      ...prevState,
      heroName : "Masala Dosa"
    }))
  }

  return (
    // Use the image file as the background image
    <div className="hero-image"> 
      <img className="hero-back" src={`${hero.heroPic}`} alt="" onError={handleError}/>
      <div className="hero-text">
        <h1>{hero.heroName}</h1>
        <p>Delcious Food for your Good day</p>
        <button>Recipe</button>
      </div>
    </div>

  )
}

export default heroImage