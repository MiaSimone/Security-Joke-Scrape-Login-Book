import "./style2.css"
import React, {useState, useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
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
            <NavLink exact activeClassName="selected" to="/">Home</NavLink>
          </li>
          <li>
            <NavLink activeClassName="selected" to="/jokes">Jokes</NavLink>
          </li>
          <li>
            <NavLink activeClassName="selected" to="/scrape">Scrape</NavLink>
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
              <Home />
            </Route>
            <Route path="/jokes">
              <Jokes />
            </Route>
            <Route path="/scrape">
              <ScrapeSequential />
              <ScrapeParallel />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Jokes() {
  const url = 'http://localhost:8080/jokeFetcher/api/jokes'
  const [jokeData, setJokeData] = useState('')

  function getJoke() {
    fetch(url, { headers: { 'Accept': 'application/json' } })
        .then(res => res.json())
        .then(data => {
          setJokeData(data);
        })
  }

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
      <h2>Jokes</h2>
      <h4>New jokes every 10 sec from 2 refferences:</h4>
      <p>{JSON.stringify("Joke1: " + jokeData.joke1)}</p>
      <p>{JSON.stringify("Joke1 Reference: " + jokeData.joke1Reference)}</p>
      <p>{JSON.stringify("Joke2: " + jokeData.joke2)}</p>
      <p>{JSON.stringify("Joke2 Reference: " + jokeData.joke2Reference)}</p>
    </div>
  );
}

const Log = ({ value, replacer = null, space = 2 }) => (
  <pre>
    <code>{JSON.stringify(value, replacer, space)}</code>
  </pre>
)

function ScrapeSequential() {
    const [sequential, setSequential] = useState({
        title: "",
        timeSpent: "",
        tags: []
    });

    const url = 'http://localhost:8080/webscraper/api/scrape/sequental';
    
    useEffect(() => {
        fetch(url, { headers: { 'Accept': 'application/json' } })
        .then(res => res.json())
        .then(data => setSequential({
            title: data.title,
            timeSpent: data.timeSpent,
            tags: data.tags
        }))
    }, [])
    return (
        <div>
            <Log value={sequential} />
        </div>
    )
}

function ScrapeParallel() {
    const [parallel, setParallel] = useState({
        title: "",
        timeSpent: "",
        tags: []
    });

    const url = 'http://localhost:8080/webscraper/api/scrape/parallel';

    useEffect(() => {
      fetch(url, { headers: { 'Accept': 'application/json' } })
        .then(res => res.json())
        .then(data => setParallel({
            title: data.title,
            timeSpent: data.timeSpent,
            tags: data.tags
        }))
    }, [])
    return (
        <div>
            <Log value={parallel} />
        </div>
    )
}