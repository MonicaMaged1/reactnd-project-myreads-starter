import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchPage from './SearchPage'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  }

  componentDidMount() {
    this.getBooks()
    console.log(this.state.books)
  };

  render() {
    return (
      <div className="app">
          <Route exact path='/' render={() => (
            <ListBooks
              books={this.state.books}
            />
          )} />
          <Route path='/search' render={() => (
            <SearchPage />
          )} />
      </div>
    )
  }

  async getBooks() {
    const books = await BooksAPI.getAll()
    this.setState(() => ({
      books
    }))
    console.log(books)
  }
}

export default BooksApp
