import React, { useState, useEffect } from 'react';
import '../styles/recipeStyle.css';
import axios from 'axios';
import FavCard from './FavCard';

function ListRecipe(props) {
    const [favList, setFavList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios("http://localhost:4000/getNames");
                const queue = response.data.recipeList;

                const fetchNextItem = async () => {
                    if (queue.length === 0) return;

                    const foodName = queue.shift();
                    try {
                        const res1 = await axios.get("http://localhost:4000/fullDetails", {
                            params: {
                                foodName: foodName
                            }
                        });
                        
                        setFavList(prevList => [
                            ...prevList,
                            <FavCard
                                key={foodName.id}  // Make sure to provide a unique key for React components in a list
                                details={{
                                    heroPic: res1.data.heroPic,
                                    heroName: res1.data.heroName,
                                    heroDescription: res1.data.heroDescription,
                                    heroIngredients: res1.data.heroIngredients
                                }}
                            />
                        ]);

                        // Call the next item after 100ms delay
                        setTimeout(fetchNextItem, 1);
                    } catch (error) {
                        console.error(error);
                        // Call the next item even if there's an error
                        setTimeout(fetchNextItem, 1);
                    }
                };

                // Start fetching items with a delay
                fetchNextItem();
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <section className="recipeList">
                {favList}
            </section>
        </>
    );
}

export default ListRecipe;
