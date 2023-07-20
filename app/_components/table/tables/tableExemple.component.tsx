'use client';

import Table, { TableAction } from '@components/table/table.component';
import { FaTrash, FaEdit } from 'react-icons/fa';


const TableExample = () => {
	const data = [
		{ id: 1, name: 'John Doe', age: 25, occupation: 'Developer', url: 'https://example.com' },
		{ id: 2, name: 'Jane Smith', age: 30, occupation: 'Designer', url: 'https://example.com' }
	];

	const columns = {
		id: 'ID',
		name: 'Name',
		age: 'Age',
		occupation: 'Occupation',
		url: 'URL',
	};

	const sortableColumns = ['name', 'age'];

	const actions : TableAction = {
		edit: (row) => {
			return <FaEdit onClick={() => console.log(`Editing row with ID ${row.id}`)} />;
		},
		delete: (row) => {
			return <FaTrash onClick={() => console.log(`Deleting row with ID ${row.id}`)} className={'delete'} />;
		},
	};

	return (
		<Table
			data={data}
			columns={columns}
			sortableColumns={sortableColumns}
			actions={actions}
			itemsPerPage={5}
		/>
	);
};

export default TableExample;
