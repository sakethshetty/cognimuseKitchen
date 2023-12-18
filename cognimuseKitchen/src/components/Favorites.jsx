import React, { useEffect, useState } from 'react'
import FavCard from './FavCard'
import Header from './Header'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'

function Favorites(props) {

    const [favList, setFavList] = useState([])
    const arr = []
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios("http://localhost:4000/findfav", {
                    params: {
                        email: props.loggedInState.isLoggedIn
                    }
                });
    
                const requests = response.data.fav.map(async (favItem) => {
                    const res1 = await axios.get("http://localhost:4000/fullDetails", {
                        params: {
                            foodName: favItem.food
                        }
                    });
                    return (
                        <FavCard
                            key={favItem.id}  // Make sure to provide a unique key for React components in a list
                            details={{
                                heroPic: res1.data.heroPic,
                                heroName: res1.data.heroName,
                                heroDescription: res1.data.heroDescription,
                                heroIngredients: res1.data.heroIngredients
                            }}
                        />
                    );
                });
    
                const favCards = await Promise.all(requests);
                setFavList(favCards);
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    }, [props.loggedInState.isLoggedIn]);

    console.log(favList, "rendered  favires")


    console.log(arr)
    return (
        <>
            <Header loggedInState={props.loggedInState}></Header>
            {(favList.length > 0) ? <section className="recipeList">
                {
                    favList
                }
            </section> : <div className="noFav"><h2>No Favorites</h2></div>}
        </>
    )
}

export default Favorites