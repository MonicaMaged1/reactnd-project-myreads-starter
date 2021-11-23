import React from 'react'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'
import PropTypes from 'prop-types';

const shelves = {
    currentlyReading: "Currently Reading",
    read: "Read",
    wantToRead: "Want To Read"
}

const ListBooks = props => {
    const { books } = props


    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    {Object.keys(shelves).map((shelf => (<Shelf key={shelf} title={shelves[shelf]} books={books.filter((b) => b.shelf === shelf)} onUpdate={props.onUpdate} />)))}
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    )


}

ListBooks.propTypes = {
    books: PropTypes.array
}

export default ListBooks