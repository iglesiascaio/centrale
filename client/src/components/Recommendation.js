import React,{useState} from "react"
import "./Recommendation.css"
import Carousel from 'react-elastic-carousel';
import axios from "axios"




export default function Recommendation(){
  const [recs, setRec] = useState({
    rec: []
  })

  let films = ['Arrow', 'Flash', 'Spider-Man']

  const getReco = () => {
      const apiurl = " http://www.omdbapi.com/?apikey=10ce150d";
      let recos = ['tt3107288','tt2193021']
      recos.map(rec => {
        axios.get(apiurl + "&i=" + rec).then(data =>{
          setRec(prevState =>{
            return {rec:[prevState.rec,data]}
          })
          })
      })
    return recs.rec
  }



  return (
    <section>
      <h1>Recommendation</h1>

      <Carousel>
        {films.map(item => <div>{item}</div>)}
      </Carousel>


    </section>
  )
}
