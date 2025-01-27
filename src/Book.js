import React from 'react'

const Book = props => {
    const { book, onUpdate } = props
    let authors;

    try {
        authors = book.authors.join(",")
    }
    catch (e) {
        authors = ""
    }
    let imageUrl;

    try {
        imageUrl = book.imageLinks.thumbnail
    }
    catch (e) {
        imageUrl = ""
    }
    console.log(book)

    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + imageUrl + ')' }}></div>
                <div className="book-shelf-changer">
                    <select defaultValue={book.shelf ? book.shelf : "none"} onChange={(event) => (onUpdate(book, event.target.value))}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{authors}</div>
        </div>

    )
}

export default Book