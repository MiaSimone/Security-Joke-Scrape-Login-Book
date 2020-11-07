import React, {useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    Prompt,
    Redirect 
  } from "react-router-dom";

export function Home() {
    return (
      <div>
        <h2>Home</h2>
      </div>
    );
}

export function Login({isLoggedIn, loginMsg, setLoginStatus}){
    const handleBtnClick = () => {
        setLoginStatus(!isLoggedIn);
    };
    return (
        <div>
            <h2>{loginMsg}</h2>
            <br/>
            <button onClick={handleBtnClick}>{loginMsg}</button>
        </div>
    )
}
  
  export function Products({bookFacade}) {
  
    const bookList = bookFacade.getBooks().map(b => (
      <li key={b.id}>
        {b.title} <Link to={`/products/${b.id}`}> details</Link>
      </li>
    ))
  
    return (
      <div>
        <h2>Products</h2>
        <p>{bookList}</p>
        <Switch>
          <Route exact path="/products">
            <h3>Please select a book.</h3>
          </Route>
          <Route path="/products/:id">
            <Details bookFacade={bookFacade}/>
          </Route>
        </Switch>
        
      </div>
    );
  }
  
  export function Details({bookFacade}) {
    let { id } = useParams();
    try {
        const book = bookFacade.findBook(id);
        return (
            <div>
                <h3>ID: {id}</h3>
                <p>Title: {book.title}</p>
                <p>Info: {book.info}</p>
            </div>
        );
    } catch(err){
        return (
            <div>
                <h3>The book does not exist.</h3>
            </div>
        );
    }
    
  }
  
  
  export function AddBook({bookFacade}) {
    let [isBlocking, setIsBlocking] = useState(false);
  
    const initialValue = {
      title: "",
      info: ""
    };
    const [book, setBook] = useState(initialValue);
    const [newBook, setNewBook] = useState(initialValue);
    
    const handleChange = event => {
      const target = event.target;
      const value = target.value;
      setIsBlocking(event.target.value.length > 0);
      // name is the 'name' sat at each input in form
      const name = target.name;
      setBook({ ...book, [name]: value });
      setNewBook({title:"", info:""})
    };
  
    function handleSubmit(event) {
      event.preventDefault();
      setIsBlocking(false);
      bookFacade.addBook(book);
      setBook(newBook);
      
    }
  
    return (
      <div>
        <h2>Add Book</h2>
        <form onSubmit={handleSubmit}>
          <Prompt
            when={isBlocking}
            message={location =>
              `Are you sure you want to go to ${location.pathname}`
            }
          />
          <input type="text" placeholder="Add title" name="title" value={book.title} onChange={handleChange}/>
          <br/>
          <input type="text" placeholder="Add info" name="info" value={book.info} onChange={handleChange}/>
          <br/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }

  function FindBookDetails({bookFacade, book}) {
    try {

        const [msg, setMsg] = useState('');
        function deleteBook() {
            bookFacade.deleteBook(book.id);
            setMsg("The book '" + book.title + "' has been deleted.")
        }

        return (
            <div>
                <h3>ID: {book.id}</h3>
                <p>Title: {book.title}</p>
                <p>Info: {book.info}</p>
                <button type="button" onClick={deleteBook}>Delete</button>
                <p>{msg}</p>
            </div>
        );
    } catch(err){
        return (
            <div>
                <h3>The book does not exist.</h3>
            </div>
        );
    }
    
  }

  export function FindBook({bookFacade}) {

    const [bookId, setBookId] = useState(101);
    const [book, setBook] = useState({
      id: 0,
      title: "",
      info: ""
    });
  
    function handleSubmit(event) {
      event.preventDefault();
      setBook(bookFacade.findBook(bookId))
    }
  
    return (
      <div>
        <h3>Her kan du finde din bog</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter book ID" onChange={event => setBookId(event.target.value)} />
          <button type="submit">Find Book</button>
        </form>
        <FindBookDetails bookFacade={bookFacade} book={book}/>

      </div>
    )










// Skal have lavet en function: når man trykker på Find book så ryger men på stien find-book/:id

/*
    const [formValue, setFormValue] = useState('');

    const handleChange = event => {
        const target = event.target;
        const value = target.value;
        setFormValue(value);
    };

    function handleSubmit(event) {
        event.preventDefault();
        window.history.pushState('', formValue, "/find-book/"+formValue);
    }
*/
    return (
        <div>
        <h2>Find Book</h2>
        <form >
          <input type="text" placeholder="Enter book id" name="bookID"/>
          <input type="submit" value="Find book"/>
        </form>

        <Switch>
          <Route exact path="/find-book">
            <h3>Please select a book.</h3>
          </Route>
          <Route path="/find-book/:id">
            <Details bookFacade={bookFacade}/>
          </Route>
        </Switch>
      </div>
      );
  }

/*
        <form onSubmit={handleSubmit}>
          <Prompt
            when={isBlocking}
            message={location =>
              `Are you sure you want to go to ${location.pathname}`
            }
          />
          <input type="text" placeholder="Enter book id" name="bookID" value={book.id} onChange={handleChange}/>
          <br/>
          <input type="submit" value="Submit" />
        </form>

*/





  
  export function Company() {
    return (
      <div>
        <h2>Company</h2>
      </div>
    );
  }
  
  export function NoMatch() {
    return (
      <div>
        <h2>Page Not Found</h2>
      </div>
    );
  }