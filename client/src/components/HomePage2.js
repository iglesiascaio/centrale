import React, {useState} from "react";
import Search from "./Search"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios"
import Results from './Results'
import Login from "./Login"
import Popup from "./Popup"
import Recommendation from "./Recommendation"
import GettingStarted from "./GettingStarted"
import Watched from "./Watched"

function HomePage2({user}) {
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });

  const [score,setScore] = useState({
    movieId: -1,
    rating: undefined
  });


  const apiurl = " http://www.omdbapi.com/?apikey=10ce150d";
  const urlback = "https://lsrdn3h1i7.execute-api.eu-west-1.amazonaws.com/dev/"

  const search = (e) => {
    if(e.key == "Enter"){
      if(state.s != ""){
        axios(apiurl + "&s=" + state.s).then(data =>{
          let result = data.data.Search;
          if(result != null){
            setState(prevState =>{
              return {...prevState,results:result}
            });
          }else{
            setState(prevState => {
              return{...prevState,results:[-1]}
            })
          }
          console.log(result)

        })
      }else{
        setState(prevState => {
          return {...prevState,results:[]}
        })
      }
    }
  }

  const handleInput = (e) => {
    let s = e.target.value;
    setState(prevState => {
      return {...prevState, s:s}
    })

    console.log(state.s)
  }

  const openPopup = (id) => {
    //console.log("ok")
    axios(apiurl + "&i=" + id).then(({ data}) =>{
      let result = data;
      setState(prevState =>{
        return {...prevState,selected: result}
      })
      axios(urlback + 'getRating/' + result.imdbID + '/' + user).then(data => {
        setScore(prevState => {
          console.log(data.data.rating)
          return {rating:data.data.rating, movieId: result.imdbID}
        })
      })


    }
  )
  }

  const handleRating = (e) =>{
    let s = e;
    setScore(prevState => {
      return {...prevState, rating: s}
    })
    console.log(score.rating)
    console.log(score.movieId)
  }

  const closePopup = () => {
    console.log(score.rating)
    if(score.rating != undefined){
      axios.post(urlback + "createUpdate/" + score.movieId,
      {imdbId: score.movieId,
        username: user,
        userRating: score.rating})
    }
    if(score.rating != undefined){
      axios.post(urlback + "createUpdateUser/" + score.movieId,
      {imdbId: score.movieId,
        username: user,
        userRating: score.rating})



        if(!(watched.IDs.includes(score.movieId))){
          axios(apiurl + "&i=" + score.movieId).then(data =>{
          setWatched(prevState =>{
            return {...prevState,watched:[...prevState.watched,data]}
          })

        })
        setWatched(prevState => {
          return {...prevState, IDs: [...prevState.IDs,score.movieId]}
        })}


    }
    setState(prevState => {
      return {...prevState, selected: {}}
    })
    setScore(prevState => {
      return {movieId: -1, rating: undefined}
    })



  }

  const [recs, setRec] = useState({
    rec: [],
    most: 0
  })

  const [watched, setWatched] = useState({
    watched: [],
    IDs: [],
    tried: 1
  })

  function getWatched(){
    axios.get(urlback + 'getWatched/'+ user).then(data =>{
      let Ids = Object.keys(data.data)
      setWatched(prevState => {
        return {...prevState, IDs: Object.keys(data.data)}
      })
      Ids.map(rec => {

        axios.get(apiurl + "&i=" + rec).then(data =>{
          setWatched(prevState =>{
            return {...prevState,watched:[...prevState.watched,data]}
          })
        })
      })

    })
    setWatched(prevState =>{
      return {...prevState,tried:-1}
    })
  }

  function getRecos(){
    axios.get(urlback+'getRecommendation/' + user).then(data => {
      let recos = data.data
      console.log(data)
      if(data.data.length == 0){
        axios.get(urlback + 'getMostWatched').then(data =>{
          let reccs = data.data
          reccs.map(rec => {
            axios.get(apiurl + "&i=" + rec).then(data =>{
              setRec(prevState =>{
                return {most: 1,rec:[...prevState.rec,data]}
              })
            })
          })
        })

      }else{
      recos.map(rec => {
        axios.get(apiurl + "&i=" + rec).then(data =>{
          setRec(prevState =>{
            return {rec:[...prevState.rec,data]}
          })
        })
      })}
    })

  }




  if(watched.watched.length == 0 && watched.IDs.length == 0 && watched.tried == 1){


    getRecos()
    getWatched()


  }



  return (
    <div className="App2">
      <header>
        <h1 >FILMLY</h1>
      </header>
      <main>
        <Search handleInput= {handleInput}  search= {search}/>

        <Results results={state.results} openPopup={openPopup} />

        <Recommendation films = {recs.rec} openPopup = {openPopup} tried = {recs.most} />

        <Watched films = {watched.watched} openPopup = {openPopup}/>

        {(typeof state.selected.Title != "undefined")
        ? <Popup selected = {state.selected} closePopup={closePopup} handleRating={handleRating} score={score.rating}/>
        : false}
      </main>


    </div>
  );
}

export default HomePage2;
