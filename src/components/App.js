import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../api/BooksAPI'
import '../assets/App.css'
import Search from './Search'
import BookList from './BookList'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AppBar from 'material-ui/AppBar';

//Armazenamos neste array uma lista com todas as abas da aplicação.
//Caso a aplicação passe a utilizar mais abas, basta adicioná-las no array abaixo.
const shelvesOptions = [
    {
        id: 'currentlyReading',
        name: 'Currently Reading'
    },
    {
        id: 'wantToRead',
        name: 'Want to Read'
    },
    {
        id: 'read',
        name: 'Read'
    }
]

class BooksApp extends Component {
    state = {
        books: []
    }

    componentDidMount = () => {
        BooksAPI.getAll().then((books) => {
            this.setState({ books })
        })
    }

    onUpdate = (book, shelf) => {
        if (book.shelf !== shelf) {
            book.shelf = shelf
            this.setState((state) => ({
                //Filtramos a lista pelo ID do livro a ser atualizado e depois reinserimos este na lista.
                //É uma forma de atualizar a lista sem manipular os índices.
                books: state.books.filter(b => b.id !== book.id).concat([ book ])
            }))
            BooksAPI.update(book, shelf)
        }
    }

    render() {
        return (
            <div className="app">

                <Route exact path='/'
                    render={() => (
                    <div className="list-books">
                        <AppBar title="MyReads" showMenuIconButton={false}/>
                        <div className="list-books-content">
                            <div>
                                {shelvesOptions.map((option, index) => (
                                <div className="bookshelf" key={option.id}>
                                    <h2 className="bookshelf-title">{option.name}</h2>
                                    <div className="bookshelf-books">
                                        <BookList shelves={shelvesOptions}
                                                  showShelfName={false}
                                                  books={this.state.books.filter(book => book.shelf === option.id)}
                                                  onUpdate={this.onUpdate}><p>teste</p></BookList>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>

                        <div className="open-search">
                            <Link to='/search'>
                                <FloatingActionButton>
                                        <ContentAdd />
                                </FloatingActionButton>
                            </Link>
                        </div>
                    </div>
                )} />
                <Route exact path='/search'
                    render={() => (
                        <Search shelves={shelvesOptions}
                                onUpdate={this.onUpdate}
                                booksOnShelves={this.state.books}/>
                )} />
            </div>
        )
    }
}

export default BooksApp