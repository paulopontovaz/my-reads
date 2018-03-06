import React from 'react'
import PropTypes from 'prop-types'
import ShelfChanger from './ShelfChanger'

const Book = (props) => {
	const { book, shelves, showShelfName, onUpdate } = props

	return (
		<div className="book">
			<div className="book-top">
				<a href={book.infoLink} target="_blank">
					<div className="book-cover"
					style={{
						width: 128,
						height: 193,
						backgroundImage: `url(${book.imageLinks.thumbnail})`
					}}></div>
				</a>
			</div>
			<ShelfChanger
					shelves={shelves.concat([{name: 'None', id: 'none'}])}
					showShelfName={showShelfName}
					onUpdate={onUpdate}
					book={book}/>
			<div className="book-title">{book.title}</div>
			<div className="book-authors">{
				//Como um livro pode ter mais de um autor,
				//utilza-se o 'join' para exibir uma lista de autores
				book.authors ? book.authors.join(', ') : ''
			}</div>
		</div>
	)
}

Book.propTypes = {
	book: PropTypes.object.isRequired,
	shelves: PropTypes.array,
	showShelfName: PropTypes.bool,
	onUpdate: PropTypes.func.isRequired
}

export default Book