'use client';
import React, { useEffect, useState, CSSProperties } from 'react';
import {
	getProductionItems,
	getProductionItem,
	createProductionItem,
	updateProductionItem,
	deleteProductionItem,
	ProductionItemDataAttributes,
} from '@utils/productionItems';

const styles: { [key: string]: CSSProperties } = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		margin: '0 auto',
		maxWidth: '600px',
		fontFamily: 'Arial, sans-serif'
	},
	button: {
		padding: '10px 20px',
		borderRadius: '5px',
		border: 'none',
		color: '#fff',
		backgroundColor: '#007BFF',
		cursor: 'pointer',
		marginBottom: '20px'
	},
	h1: {
		textAlign: 'center',
		color: '#007BFF',
		margin: '20px 0'
	},
	h2: {
		color: '#007BFF',
		margin: '20px 0'
	},
	input: {
		margin: '5px 0',
		padding: '10px',
		borderRadius: '5px',
		border: '1px solid #ddd'
	},
};

export default function Page() {
	const [productionItems, setProductionItems] = useState<unknown[]>([]);
	const [selectedProductionItemId, setSelectedProductionItemId] = useState<string>('');
	const [newProductionItemData, setNewProductionItemData] = useState<ProductionItemDataAttributes>({
		description: '',
		quantity: 0,
		state: '',
		type: '',
	});
	const [updatedProductionItemData, setUpdatedProductionItemData] = useState<Partial<ProductionItemDataAttributes>>({
		description: '',
		state: '',
	});

	useEffect(() => {
		const fetchItems = async () => {
			const data = await getProductionItems();
			setProductionItems(data);
		};

		fetchItems();
	}, []);

	const fetchProductionItem = async () => {
		if (selectedProductionItemId) {
			const data = await getProductionItem(selectedProductionItemId);
			console.log(data); // Log the response data
		}
	};

	const createNewProductionItem = async () => {
		const data = await createProductionItem({
			data: {
				attributes: newProductionItemData,
			},
		});
		console.log(data); // Log the response data
	};

	const updateSelectedProductionItem = async () => {
		if (selectedProductionItemId) {
			const data = await updateProductionItem(selectedProductionItemId, {
				data: {
					id: selectedProductionItemId,
					attributes: updatedProductionItemData,
				},
			});
			console.log(data); // Log the response data
		}
	};

	const deleteSelectedProductionItem = async () => {
		if (selectedProductionItemId) {
			const data = await deleteProductionItem(selectedProductionItemId);
			console.log(data); // Log the response data
		}
	};

	return (
		<div style={styles.container}>
			<h1 style={styles.h1}>Productions</h1>

			<h2 style={styles.h2}>Select Production Item</h2>
			<input
				style={styles.input}
				type="text"
				value={selectedProductionItemId}
				onChange={(e) => setSelectedProductionItemId(e.target.value)}
				placeholder="Production Item ID"
			/>
			<button style={styles.button} onClick={fetchProductionItem}>Get Selected Production Item</button>

			<h2 style={styles.h2}>Create New Production Item</h2>
			<input
				style={styles.input}
				type="text"
				value={newProductionItemData.description}
				onChange={(e) =>
					setNewProductionItemData({
						...newProductionItemData,
						description: e.target.value,
					})
				}
				placeholder="Description"
			/>
			<input
				style={styles.input}
				type="number"
				value={newProductionItemData.quantity}
				onChange={(e) =>
					setNewProductionItemData({
						...newProductionItemData,
						quantity: Number(e.target.value),
					})
				}
				placeholder="Quantity"
			/>
			<input
				style={styles.input}
				type="text"
				value={newProductionItemData.state}
				onChange={(e) =>
					setNewProductionItemData({
						...newProductionItemData,
						state: e.target.value,
					})
				}
				placeholder="State"
			/>
			<input
				style={styles.input}
				type="text"
				value={newProductionItemData.type}
				onChange={(e) =>
					setNewProductionItemData({
						...newProductionItemData,
						type: e.target.value,
					})
				}
				placeholder="Type"
			/>
			<button style={styles.button} onClick={createNewProductionItem}>Create Production Item</button>

			<h2 style={styles.h2}>Update Selected Production Item</h2>
			<input
				style={styles.input}
				type="text"
				value={updatedProductionItemData.description}
				onChange={(e) =>
					setUpdatedProductionItemData({
						...updatedProductionItemData,
						description: e.target.value,
					})
				}
				placeholder="New Description"
			/>
			<input
				style={styles.input}
				type="text"
				value={updatedProductionItemData.state}
				onChange={(e) =>
					setUpdatedProductionItemData({
						...updatedProductionItemData,
						state: e.target.value,
					})
				}
				placeholder="New State"
			/>
			<button style={styles.button} onClick={updateSelectedProductionItem}>Update Production Item</button>

			<h2 style={styles.h2}>Delete Selected Production Item</h2>
			<button style={styles.button} onClick={deleteSelectedProductionItem}>Delete Production Item</button>
		</div>
	);
}
