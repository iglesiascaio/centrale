import React,{useState} from "react"
import "./Recommendation.css"
import Carousel from 'react-elastic-carousel';
import axios from "axios"
import Result from "./Result.js"




export default function Watched({films, openPopup}){

  console.log(films)

  if(films.length == 0 || films.length == undefined){
    return (<h1>Didn't watch anything , yet? Let's solve this</h1>)

  }

  return (
    <section>
      <h1>Watch Again</h1>

      <Carousel>
        {films.map(item => <Result key = {item.data.imdbID} result={item.data} openPopup = {openPopup} />)}
      </Carousel>


    </section>
  )
}
