import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherBtn = ( { cities, colorArr, setCity }) => {

  return (
    <div className='btn-box'>
        <Button variant="warning" onClick={() => setCity('')}>Current Location</Button>
        {cities.map((item, index) => { return <Button variant={colorArr[index]} key={index} onClick={() => {setCity(item)}}>{item}</Button> })}
    </div>
  )
}

export default WeatherBtn
