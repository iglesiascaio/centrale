import React from "react"
import Rating from "react-rating"
import { Button } from "react-bootstrap";

export default function Popup({selected, closePopup}){
  return(
    <section className="popup">
      <div className = "content">
        <h2>{selected.Title}<span>({selected.Year})</span></h2>
        <p className="rating"> Rating Imdb: {selected.imdbRating} </p>
        <div className="plot">
          <img src={selected.Poster}/>
          <div className = "score">
            <p> Already watched? </p>
            <Rating initialRating = {undefined}/>

          </div>
          <p>{selected.Plot}</p>

        </div>


        <Button className="close" onClick={closePopup}>Close</Button >

      </div>
    </section>
  )
}
