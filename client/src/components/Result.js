import React from "react";
import {Link} from "react-router-dom";

function Result({result, openPopup}){
  let link = "https://www.imdb.com/title/"+ result.imdbID;
  if(result == -1){
    return(
      <h3 class = "NotFound">Not Found</h3>
    )
  }
  return (
    <div className='result' onClick = {()=>openPopup(result.imdbID)} >
      <img src = {result.Poster}/>
      <p > {result.Title} </p>
    </div>
  )
}
export default Result
