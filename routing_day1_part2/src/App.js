import React, {useState} from "react";
import './App.css';
import {Home, Products, Details, AddBook, Company, NoMatch, FindBook, Login} from "./appComponents"; 
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useHistory
} from "react-router-dom";
 

function App({ bookFacade }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let history = useHistory();

  const setLoginStatus = status => {
    setIsLoggedIn(status);
    history.push("/");
  };

  return (
    <div>
      <Header 
        loginMsg={isLoggedIn ? "Logout" : "Login"}
        isLoggedIn={isLoggedIn}
      />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/products">
          <Products bookFacade={bookFacade}/>
        </Route>
        <Route path="/add-book">
          <AddBook bookFacade={bookFacade}/>
        </Route>
        <Route path="/find-book">
          <FindBook bookFacade={bookFacade}/>
        </Route>
        <Route path="/company">
          <Company />
        </Route>
        <Route path="/login-out">
          <Login 
            loginMsg={isLoggedIn ? "Logout" : "Login"}
            isLoggedIn={isLoggedIn}
            setLoginStatus={setLoginStatus}
          />
        </Route>
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}

function Header({isLoggedIn, loginMsg}) {
  return (
    <div>
      <ul className="header">
        <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
        <li><NavLink activeClassName="active" to="/products">Products</NavLink></li>
        {isLoggedIn && (
          <React.Fragment>
            <li><NavLink activeClassName="active" to="/add-book">Add Book</NavLink></li>
            <li><NavLink activeClassName="active" to="/find-book">Find Book</NavLink></li>
          </React.Fragment>
        )}
        <li><NavLink activeClassName="active" to="/company">Company</NavLink></li>
        <li><NavLink activeClassName="active" to="/login-out">{loginMsg}</NavLink></li>
      </ul>
    </div>
  );
}



export default App;
