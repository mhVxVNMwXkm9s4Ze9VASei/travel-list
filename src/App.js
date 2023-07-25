import { useState } from "react";

export default function App() {
	const [items, setItems] = useState([]);

	function handleAddItems(item) {
		setItems((items) => [...items, item]);
	}

	function handleDeleteItem(id) {
		setItems((items) => items.filter((item) => item.id !== id));
	}

	return (
		<div className="app">
			<Logo />
			<Form onAddItems={handleAddItems} />
			<PackingList
				items={items}
				onDeleteItem={handleDeleteItem}
			/>
			<Stats />
		</div>
	);
}

function Logo() {
	return <h1>🏝️ Far Away 🧳</h1>;
}

function Form({ onAddItems }) {
	const [description, setDescription] = useState("");
	const [quantity, setQuantity] = useState(1);

	function handleSubmit(event) {
		event.preventDefault();

		if (!description) return;

		const newItem = { description, packed: false, quantity, id: Date.now() };
		console.log(newItem);

		onAddItems(newItem);

		setDescription("");
		setQuantity(1);
	}

	return (
		<form
			className="add-form"
			onSubmit={handleSubmit}
		>
			<h3>What do you need for your 😍 trip?</h3>
			<input
				type="number"
				placeholder="Quantity..."
				min="1"
				value={quantity}
				onChange={(event) => setQuantity(event.target.value)}
			/>
			<input
				type="text"
				placeholder="Item..."
				value={description}
				onChange={(event) => setDescription(event.target.value)}
			/>
			<button>Add</button>
		</form>
	);
}

function PackingList({ items, onDeleteItem }) {
	return (
		<div className="list">
			<ul>
				{items.map((item) => (
					<Item
						key={item.id}
						item={item}
						onDeleteItem={onDeleteItem}
					/>
				))}
			</ul>
		</div>
	);
}

function Item({ item, onDeleteItem }) {
	return (
		<li>
			<span style={item.packed ? { textDecoration: "line-through" } : {}}>
				{item.quantity} {item.description}
			</span>
			<button onClick={() => onDeleteItem(item.id)}>❌</button>
		</li>
	);
}

function Stats() {
	return (
		<footer className="stats">
			<em>💼 You have X items on your list, and you already packed X (X%)</em>.
		</footer>
	);
}
