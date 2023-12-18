import React from 'react'
import { Link } from 'react-router-dom'

function FavCard(props) {

    console.log(props)

  const handleError = (e)  => {
    e.target.src = "https://th.bing.com/th/id/OIG.hJaxCjpJSxHMe0m7fclW?pid=ImgGn"
  }

  return (
    <Link to={`/details/${props.details.heroName}`} className="link">
      <article>
        <div className="article-wrapper">
          <figure>
            <img src={`${props.details.heroPic}`} alt="" onError={handleError}/>
          </figure>
          <div className="article-body">
            <h2>{props.details.heroName}</h2>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default FavCard