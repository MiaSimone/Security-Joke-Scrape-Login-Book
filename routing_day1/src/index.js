import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppNested from './AppNested';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  useParams,
  useRouteMatch
} from "react-router-dom";

const info = [
  { id: "rendering", title: "Rendering with React", info: "Add klasdklflasjdfkljjkdsf" },
  { id: "components", title: "components", info: "Add sajfljasflkdsajflksjak" },
  { id: "props-v-state", title: "Props v. State", info: "Add some text here" },
  { id: "react-routing", title: "Routing with React Reouter", info: "Cool text" },
  { id: "react", title: "Lear React", info: "Cool text about React" },
]

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div>
        <ul className="header">
          <li>
            <NavLink exact activeClassName="selected" to="/">App</NavLink>
          </li>
          <li>
            <NavLink activeClassName="selected" to="/appNested">AppNested</NavLink>
          </li>
        </ul>
 
        <hr />
 
        <Switch>
          <Route exact path="/">
            <App />
          </Route>
          <Route path="/appNested">
            <AppNested info={info} />
          </Route>
        </Switch>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

/* ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
); */

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
