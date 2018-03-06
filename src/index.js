import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './components/App'
import './assets/index.css'	

ReactDOM.render(
	<MuiThemeProvider palette="blueGrey600">
		<BrowserRouter><App /></BrowserRouter>
	</MuiThemeProvider>
	, 
	document.getElementById('root')
)
