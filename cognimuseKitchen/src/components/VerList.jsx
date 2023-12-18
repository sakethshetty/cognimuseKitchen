import React from 'react'
import HorList from './HorList';

function VerList() {

    const title = ["Treat yourself with", "Top picks of the day", "Delicious and Nutritious", "Taste of Heaven"]
    const arr = [];

    for(let i=0; i<4; i++)  arr.push(<HorList key={i} title={title[i]}></HorList>)

  return (
    <>
    {
        arr
    }
    </>
  )
}

export default VerList