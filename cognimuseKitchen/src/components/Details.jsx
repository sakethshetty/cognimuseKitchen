import React, { useEffect, useState } from 'react'
import '../styles/detailsStyle.css'
import Header from './Header'
import Footer from './Footer'
import Ingredients from './Ingredients'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Details(props) {

    console.log(props.foodName)

    const [hero, setHero] = useState({
        heroPic: "https://th.bing.com/th/id/OIG.wF8MTXHPT3vDTgEvEqdl?pid=ImgGn&w=1024&h=1024&rs=1",
        heroName: "Loading...",
        heroDescription: "Loading..",
        heroIngredients: Array(5).fill(["https://th.bing.com/th/id/OIG.YfPOt_1J.fWA6ORr_948?pid=ImgGn&w=1024&h=1024&rs=1", "Loading...."])
    })

    const [checkboxChecked, setCheckboxChecked] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:4000/checkfav", {
            params: {
                food: props.foodName,
                email: props.loggedInState.isLoggedIn
            }
        })
            .then(res => {
                console.log(res)
                setCheckboxChecked(true)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    console.log(props.loggedInState.isLoggedIn)

    const navigate = useNavigate();

    const handleCheckboxChange = (event) => {

        console.log("cloicked")

        if(props.loggedInState.isLoggedIn) {
            axios.get("http://localhost:4000/addfav", {
                params: {
                    email: props.loggedInState.isLoggedIn,
                    food: props.foodName
                }
            })
                .then(res => {
                    console.log(res)

                    setCheckboxChecked(!event.target.checked);
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            navigate("/login")
        }
    };

    useEffect(() => {
        axios.get("http://localhost:4000/fullDetails", {
            params: {
                foodName: props.foodName
            }
        })
            .then(res => {
                console.log(res)
                setHero({
                    heroPic: res.data.heroPic,
                    heroName: res.data.heroName,
                    heroDescription: res.data.heroDescription,
                    heroIngredients: res.data.heroIngredients
                })
                // console.log(heroPic, heroName)
            })
            .catch(err => {
                console.log(err)
            })
    }, [props.foodName]);

    const handleError = (e) => {
        e.target.src = "https://th.bing.com/th/id/OIG.wF8MTXHPT3vDTgEvEqdl?pid=ImgGn&w=1024&h=1024&rs=1"
    }

    return (
        <>
            <Header loggedInState={props.loggedInState}></Header>
            <div className="bigHolder">
                <div className="details-holder">
                    <div className='details'>
                        <img className="details-image" src={hero.heroPic} onError={handleError} />
                        <div className='fav-holder'>
                            <input
                                type="checkbox"
                                id="checkbox"
                                name="favorite"
                                checked={checkboxChecked}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="checkbox" >
                                <svg id="heart-svg" viewBox="467 392 58 57" xmlns="http://www.w3.org/2000/svg">
                                    <g id="Group" fill="none" fillRule="evenodd" transform="translate(467 392)">
                                        <path
                                            d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
                                            id="heart"
                                            fill="#AAB8C2"
                                        />
                                        <circle id="main-circ" fill="#E2264D" opacity="0" cx="29.5" cy="29.5" r="1.5" />

                                        <g id="grp7" opacity="0" transform="translate(7 6)">
                                            <circle id="oval1" fill="#9CD8C3" cx="2" cy="6" r="2" />
                                            <circle id="oval2" fill="#8CE8C3" cx="5" cy="2" r="2" />
                                        </g>

                                        <g id="grp6" opacity="0" transform="translate(0 28)">
                                            <circle id="oval1" fill="#CC8EF5" cx="2" cy="7" r="2" />
                                            <circle id="oval2" fill="#91D2FA" cx="3" cy="2" r="2" />
                                        </g>

                                        <g id="grp3" opacity="0" transform="translate(52 28)">
                                            <circle id="oval2" fill="#9CD8C3" cx="2" cy="7" r="2" />
                                            <circle id="oval1" fill="#8CE8C3" cx="4" cy="2" r="2" />
                                        </g>

                                        <g id="grp2" opacity="0" transform="translate(44 6)">
                                            <circle id="oval2" fill="#CC8EF5" cx="5" cy="6" r="2" />
                                            <circle id="oval1" fill="#CC8EF5" cx="2" cy="2" r="2" />
                                        </g>

                                        <g id="grp5" opacity="0" transform="translate(14 50)">
                                            <circle id="oval1" fill="#91D2FA" cx="6" cy="5" r="2" />
                                            <circle id="oval2" fill="#91D2FA" cx="2" cy="2" r="2" />
                                        </g>

                                        <g id="grp4" opacity="0" transform="translate(35 50)">
                                            <circle id="oval1" fill="#F48EA7" cx="6" cy="5" r="2" />
                                            <circle id="oval2" fill="#F48EA7" cx="2" cy="2" r="2" />
                                        </g>

                                        <g id="grp1" opacity="0" transform="translate(24)">
                                            <circle id="oval1" fill="#9FC7FA" cx="2.5" cy="3" r="2" />
                                            <circle id="oval2" fill="#9FC7FA" cx="7.5" cy="2" r="2" />
                                        </g>
                                    </g>
                                </svg>
                            </label>
                        </div>


                        <h2 className='details-heading'>{props.foodName}</h2>
                        <p className='details-description'>{hero.heroDescription}</p>
                        <h2>Ingredients</h2>
                        <Ingredients Ingredients={hero.heroIngredients}></Ingredients>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default Details