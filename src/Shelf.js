import React  from 'react'
import Book from './Book'

const Shelf = props => {
    const {title, books } = props

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book) => (
                        <li key={book.id}>
                            <Book book={book} onUpdate={props.onUpdate}/>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )

}

export default Shelf