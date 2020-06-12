import React,{useState} from "react"
import "./Recommendation.css"
import Carousel from 'react-elastic-carousel';
import axios from "axios"
import Result from "./Result.js"




export default function Recommendation({films, openPopup, tried}){
  const apiurl = " http://www.omdbapi.com/?apikey=10ce150d";
  const urlback = "https://lsrdn3h1i7.execute-api.eu-west-1.amazonaws.com/dev/"



  return (
    <section >
      {(tried != 1) ? <h1>Recommendation</h1> : <h1>Most Watched</h1>}

      <Carousel className="carousel pretty_container">
        {films.map(item => <Result key = {item.data.imdbID} result={item.data} openPopup = {openPopup} />)}
      </Carousel>


    </section>
  )
}
