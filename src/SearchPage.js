import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchPage extends Component {
  state = {
    showingBooks: [],
    query: ''
  }
  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim()
    }))
  }
  clearQuery = () => {
    this.updateQuery('')
  }

  search = async (query) => {
    console.log('query', query)
    this.updateQuery(query)
    if (query.trim()) {
      const foundBooks = await BooksAPI.search(query)
      console.log('foundBooks', foundBooks)
      if (foundBooks && !foundBooks.error) {
        const booksWithShelf = foundBooks.map(b => {
          const myBook = this.props.books.find(book => b.id === book.id)
          if (myBook) {
            b.shelf = myBook.shelf
            console.log("HEREEE")
          }
          return b
        })
        console.log(foundBooks)
        console.log(booksWithShelf)
        this.setState({
          showingBooks: booksWithShelf
        })
      }
      else {
        this.setState({
          showingBooks: []
        })
      }
    }
    else {
      this.setState({
        showingBooks: []
      })
    }
  }

  render() {
    const { query } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" >Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => {
                this.search(event.target.value)
              }} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.showingBooks.map((book) => <Book key={book.id} book={book} onUpdate={this.props.onUpdate}></Book>)}
          </ol>
        </div>
      </div>
    )
  }

}


export default SearchPage