import React, { useEffect, useState } from 'react'
import Card from './Card';
import axios from 'axios';
import '../styles/horStyle.css'
import heroImage from './Hero';

function HorList(props) {

    const arr = [];

    const [foodDetails, setFoodDetails] = useState(new Array(20).fill({
        heroName: "Loading...",
        heroPic: "https://th.bing.com/th/id/OIG.LwGjadfbaP3oN.emIwc.?pid=ImgGn&w=1024&h=1024&rs=1"
    }))

    // let i = 0
    // useEffect(() => {
    //     console.log("sent")
    //     axios.get("http://localhost:4000/cards", {
    //         params: {
    //             count: 10
    //         }
    //     })
    //         .then(res => {
    //             console.log(res)
    //             // setHero({ heroPic: res.data.heroPic, heroName: res.data.heroName })
    //             // console.log(heroPic, heroName)
    //             let tempdetails = res.data.foodDetails;
    //             // console.log(res.data)
    //             setFoodDetails(tempdetails)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }, []);

    // console.log(foodDetails)

    for (let i = 0; i < 20; i++) {
        // console.log(foodDetails[i].heroPic, foodDetails[i].heroName)
        arr.push(<Card key={i} foodDetail={{ heroPic: foodDetails[i].heroPic, heroName: foodDetails[i].heroName }}></Card>);
    }

    return (
        <>
            <h2 className='foodheading'>{props.title}</h2>
            <section className="articles">
                {
                    arr
                }
            </section>
        </>
    )
}

export default HorList