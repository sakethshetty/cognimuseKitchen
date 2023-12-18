import React,{useState, useEffect} from 'react'
import '../styles/cardStyle.css'
import { Link} from 'react-router-dom'
import axios from 'axios';

function Card(props) {

  // console.log(props)
  // console.log("rendered card")

  // const hero = {heroPic : props.foodDetail.heroPic, heroName : props.foodDetail.heroName}

  // console.log(hero)
  const [hero, setHero] = useState({heroPic : "https://th.bing.com/th/id/OIG.hJaxCjpJSxHMe0m7fclW?pid=ImgGn", heroName : "Loading..."})

  useEffect( () => {
     axios.get("http://localhost:4000/hero")
      .then(res => {
        console.log(res)
        setHero({heroPic : res.data.heroPic, heroName : res.data.heroName})
        // console.log(heroPic, heroName)
      })
      .catch(err => {
        console.log(err)
      })
  }, []);

const handleError = (e) => {
  let imgLink = [
    "https://th.bing.com/th/id/OIG.LwGjadfbaP3oN.emIwc.?w=173&h=173&c=6&r=0&o=5&dpr=1.1&pid=ImgGn",
    "https://th.bing.com/th/id/OIG.hJaxCjpJSxHMe0m7fclW?pid=ImgGn",
    "https://th.bing.com/th/id/OIG.wF8MTXHPT3vDTgEvEqdl?pid=ImgGn",
    "https://th.bing.com/th/id/OIG.BNi_i61e0LL8TWsRaiGO?pid=ImgGn",
    "https://th.bing.com/th/id/OIG.7OsjjUBd7w3O6e62QdGR?pid=ImgGn",
    "https://th.bing.com/th/id/OIG.1PnHDibT1mLqUNGEfp0T?pid=ImgGn",
    "https://th.bing.com/th/id/OIG.3iC0Z22beVpCXRwk19Qk?pid=ImgGn",
    "https://th.bing.com/th/id/OIG.lfCXCASaQr2uRrxqDeM4?pid=ImgGn"
  ]
  e.target.src = imgLink[Math.floor(Math.random()*7)]
}


  return (
    <Link to={`/details/${hero.heroName}`} className="link">
      <article>
        <div className="article-wrapper">
          <figure>
            <img src={`${hero.heroPic}`} alt="" onError={handleError}/>
          </figure>
          <div className="article-body">
            <h2>{hero.heroName}</h2>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default Card