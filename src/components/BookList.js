import React from 'react'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import Book from './Book'

const BookList = (props) => {
	const { books, shelves, showShelfName, onUpdate } = props

	books.sort(sortBy('title'))

	return (
        <ol className="books-grid">
        	{books.map((book, bookIndex) => (
        		<li key={book.id}>
        			<Book
        				book={book}
        				shelves={shelves}
						showShelfName={showShelfName}
						onUpdate={onUpdate}/>
				</li>
    		))}
        </ol>
	)
}

BookList.propTypes = {
	books: PropTypes.array.isRequired,
	shelves: PropTypes.array,
	showShelfName: PropTypes.bool,
	onUpdate: PropTypes.func.isRequired
}

export default BookList