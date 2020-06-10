import React,{useState} from "react"
import "./Recommendation.css"
import axios from "axios"




export default function Recommendation(){
  const [recs, setRec] = useState({
    rec: []
  })

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

    </section>
  )
}
