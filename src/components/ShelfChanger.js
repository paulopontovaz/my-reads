import React from 'react'
import PropTypes from 'prop-types'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const ShelfChanger = (props) => {
	const { shelves, showShelfName, onUpdate, book } = props

	return (
		<SelectField
			floatingLabelText="Shelf"
			value={book.shelf || 'none'}
			//a função "onChange" do componente SelectField recebe os três argumentos abaixo,
			//diferente da função "onChange" de um select comum.
			onChange={(event, selectedIndex, value) => onUpdate(book, value)}
			autoWidth={true}
			fullWidth>
			{shelves.map((shelf, index) => (
				<MenuItem
					key={index}
					value={shelf.id}
					label={showShelfName ? shelf.name : 'Change'}
					primaryText={shelf.name} />
			))}
		</SelectField>
	)
}

ShelfChanger.propTypes = {
	shelves: PropTypes.array.isRequired,
	showShelfName: PropTypes.bool,
	book: PropTypes.object.isRequired,
	onUpdate: PropTypes.func.isRequired
}

export default ShelfChanger;
