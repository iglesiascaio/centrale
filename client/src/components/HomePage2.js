import React, {useState} from "react";
import Search from "./Search"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios"
import Results from './Results'
import Login from "./Login"
import Popup from "./Popup"

function HomePage2() {
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });


  const apiurl = " http://www.omdbapi.com/?apikey=10ce150d";

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
      console.log(state.selected)
    }
  )
  }

  const closePopup = () => {
    setState(prevState => {
      return {...prevState, selected: {}}
    })
  }

  return (
    <div className="App2">
      <header>
        <h1>FILMLY</h1>
      </header>
      <main>
        <Search handleInput= {handleInput}  search= {search}/>

        <Results results={state.results} openPopup={openPopup} />

        {(typeof state.selected.Title != "undefined")
        ? <Popup selected = {state.selected} closePopup={closePopup}/>
        : false}
      </main>


    </div>
  );
}

export default HomePage2;
