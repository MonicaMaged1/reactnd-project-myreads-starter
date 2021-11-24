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
  };

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => 
          <ListBooks
            books={this.state.books}
            onUpdate={this.update}
          />
        } />
        <Route path='/search' render={() =>
          <SearchPage
            books={this.state.books}
            onUpdate={this.update} />
        } />
      </div>
    )
  }

  async getBooks() {
    const books = await BooksAPI.getAll()
    this.setState(() => ({
      books
    }))
  }

  update = async (book, shelf) => {
    await BooksAPI.update(book, shelf)
    const isBookFound = this.state.books.find((b) => b.id === book.id)
    if (isBookFound) {
      this.setState({
        books: this.state.books.map((b) => {
          if (b.id === book.id) {
            b.shelf = shelf
          }
          return b;
        })
      })
    }
    else {
      this.setState({
        books: [...this.state.books, { ...book, shelf }]
      })
    }
  }
}

export default BooksApp
