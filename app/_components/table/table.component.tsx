'use client';
import { FC, ReactNode, useState } from 'react';
import './table.styles.scss';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';

type TableRow = {
    [key: string]: string | number;
};

export type TableAction = {
    [key: string]: (row: TableRow) => ReactNode;
};

type TableProps = {
    data: TableRow[];
    columns: { [key: string]: string };
    sortableColumns: string[];
    actions?: TableAction;
    itemsPerPage: number;
};

const Table: FC<TableProps> = ({ data, columns, sortableColumns, actions, itemsPerPage }) => {
	const [currentPage, setCurrentPage] = useState(0);
	const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);
	const [searchTerm, setSearchTerm] = useState('');

	const columnKeys = Object.keys(columns);
	const numberOfPages = Math.ceil(data.length / itemsPerPage);

	const filteredData = searchTerm ? data.filter((item) => {
		return Object.values(item).some(val => val.toString().toLowerCase().includes(searchTerm.toLowerCase()));
	}) : [...data];

	const sortedData = sortConfig ? filteredData.sort((a, b) => {
		if (a[sortConfig.key] < b[sortConfig.key]) {
			return sortConfig.direction === 'ascending' ? -1 : 1;
		}
		if (a[sortConfig.key] > b[sortConfig.key]) {
			return sortConfig.direction === 'ascending' ? 1 : -1;
		}
		return 0;
	}) : filteredData;

	const handleSort = (key: string) => {
		let direction = 'ascending';
		if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
			direction = 'descending';
		}
		setSortConfig({ key, direction });
	};

	const paginatedData = sortedData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

	return (
		<>
			<input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." />
			<table className={'table'}>
				<thead>
					<tr>
						{columnKeys.map(key => (
							<th className={'header'} key={key} onClick={() => sortableColumns.includes(key) && handleSort(key)}>
								{columns[key]}
								{sortableColumns.includes(key) && (
									sortConfig?.key === key
										? (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)
										: <FaSort/>
								)}
							</th>
						))}
						{actions && <th></th>}
					</tr>
				</thead>
				<tbody>
					{paginatedData.map((row, rowIndex) => (
						<tr key={rowIndex}>
							{columnKeys.map(key => (
								<td key={key}>{row[key]}</td>
							))}
							{actions && (
								<td className={'actions-table'}>
									{Object.keys(actions).map((action, actionIndex) => (
										<div key={actionIndex}>{actions[action](row)}</div>
									))}
								</td>
							)}
						</tr>
					))}
				</tbody>
			</table>
			{numberOfPages > 1 && (
				<div>
					{Array.from({ length: numberOfPages }, (_, i) => i).map((_, i) => (
						<button onClick={() => setCurrentPage(i)} key={i} disabled={i === currentPage}>
							{i + 1}
						</button>
					))}
				</div>
			)}
		</>
	);
};

export default Table;
