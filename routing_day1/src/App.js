import "./style2.css"
import upper, {text1,text2, text3} from "./file1";
import person, {males, females} from "./file2";
import { MultiWelcome } from "./file3";
import { Example } from "./hooks";
import { useState, useEffect } from 'react';
import ListDemo from './ListDemo';

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function BasicExample() {
  return (
    <Router>
      <div>
        <ul className="header">
          
          <li>
            <NavLink exact activeClassName="selected" to="/exercise1">Exercise1</NavLink>
          </li>
          <li>
            <NavLink activeClassName="selected" to="/exercise2">Exercise2</NavLink>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Exercises />
            </Route>
            <Route path="/exercise1">
              <Exercise1 />
            </Route>
            <Route path="/exercise2">
              <Exercise2 initialCount={5}/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

function Exercises() {
  return (
    <div>
      <h2>Exercises!</h2>
    </div>
  );
}

function Exercise1() {
  const { firstName, email } = person;

  const personV2 = person;
    personV2.phone = 123456;
    personV2.friends = [...males, ...females];
  
  

  console.log([...males, ...females]);
  console.log([...males, "Kurt", "Helle", ...females, "Tina"]);

  console.log(personV2);

  return (
    <div>
      <h2>Ex 1</h2> 
      <p>{upper("please uppercase me")}</p>
      <p>{text1}</p>
      <p>{text2}</p>
      <p>{text3}</p>

      <h2>Ex 2</h2>
      <p>FirstName: {firstName}, Email: {email}</p>

      <h2>Ex 3</h2>
      <MultiWelcome/>

      <h2>Hooks</h2>
      <Example/>
    </div>
  )
}

function Exercise2(props) {
  const {initialCount} = props;
    // Create localStorage count :
    const localStorageCount = Number(window.localStorage.getItem('count') || 0);
    const [count, setCount] = useState(localStorageCount);
    const [chuckJoke, setChuckJoke] = useState('')
    const [joke, setJoke] = useState('')

    const url2 = 'https://icanhazdadjoke.com'
    const url = 'https://api.chucknorris.io/jokes/random'

    function incrementCount(){
      setCount(count +initialCount);
    }

    function decrementCount(){
      setCount(count -initialCount);
    }

    useEffect(
      () => {
        window.localStorage.setItem("count", count);
      }, [count]
    )

    useEffect(() => {
      const interval = setInterval(() => {
          getJoke()
      }, 10000)
      return () => {
          clearInterval(interval)
          alert('Hov, du er på  vej væk')
      }
  }, [])

    return (
      <div>
        <p>Increment count:</p>
        <button onClick={incrementCount}>Increment</button>
        <p>Decrement count:</p>
        <button onClick={decrementCount}>Decrement</button>
        <p>Count is now: {count}</p>
        <button onClick={getChuckJoke}>Get ChuckNorris</button>
        <p>{chuckJoke}</p>
        <p>New joke every 10 sec:</p>
        <p>{joke}</p>
        <p>ListDemo:</p>
        <ListDemo/>
      </div>
    )

    function getJoke() {
      fetch(url2, { headers: { 'Accept': 'application/json' } })
          .then(res => res.json())
          .then(data => {
              setJoke(data.joke)
          })
  }

    function getChuckJoke() {
      fetch(url)
          .then(res => res.json()) //in flow1, just do it
          .then(data => {
            setChuckJoke(data.value)
          })
    }

}
