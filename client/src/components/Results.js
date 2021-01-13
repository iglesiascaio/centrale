import React from "react"
import Result from "./Result"
import Carousel from 'react-elastic-carousel';

function Results({results, openPopup}){
  if(results.length == 0){
    return false;
  }else if(results[0] == -1){
    return(
    <div>
      <h1>NOT FOUND</h1>
    </div>)
  }
  else{

  return (
    < section className='results'>
    <h1>Search Results:</h1>
    <Carousel>
      {results.map(result =>
        <Result key = {result.imdbID} result={result} openPopup = {openPopup} />
       )}
    </Carousel>
    </section>

  )}
}
export default Results
