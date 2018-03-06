import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../api/BooksAPI'
import PropTypes from 'prop-types'
import BookList from './BookList'
import {DebounceInput} from 'react-debounce-input';

class Search extends Component {
	static propTypes = {
		shelves: PropTypes.array,
		onUpdate: PropTypes.func.isRequired
	}

	state = {
		books: [],
		showErrorMessage: false
	}

	searchBooks = (query) => {
		const booksOnShelves = this.props.booksOnShelves

		if (query) {
			BooksAPI.search(query.trim())
			.then((books) => {
				//O livros retornados da função "search" da API não possuem a proprieadade "shelf",
				//sendo assim, é necessário alterar as instâncias que estão também nas prateleiras.
				booksOnShelves.forEach((book) => {
					const index = books.findIndex((b) => b.id === book.id)

					if(index >= 0 && book.shelf)
						books[index].shelf = book.shelf
				})

				this.setState({ books, showErrorMessage: false })
			})
			.catch((error) => {
				this.setState({ books: [], showErrorMessage: true })
			})
		} else
			this.setState({ books: [] })
	}

	render(){
		const { shelves, onUpdate } = this.props
		const { books, showErrorMessage } = this.state

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link to='/' className='close-search'>Close</Link>
					<div className="search-books-input-wrapper">
						<DebounceInput
								placeholder="Search by title or author"
								debounceTimeout={300}
								onChange={(event) => this.searchBooks(event.target.value)} />

					</div>
				</div>
				<div className="search-books-results">
					{
						showErrorMessage ?
						(<div><span>No books were found with the current keywords</span></div>) :
						(<BookList
							shelves={shelves}
							books={books}
							onUpdate={onUpdate}
							showShelfName={true} />)
					}
				</div>
			</div>
		)
	}
}

export default Search;
