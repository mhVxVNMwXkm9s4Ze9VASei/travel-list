import { useState } from "react";

export default function App() {
	const [items, setItems] = useState([]);

	function handleAddItems(item) {
		setItems((items) => [...items, item]);
	}

	function handleClearItems() {
		const confirmed = window.confirm(
			"Are you sure you want to clear your item list?"
		);

		if (confirmed) setItems([]);
	}

	function handleDeleteItem(id) {
		setItems((items) => items.filter((item) => item.id !== id));
	}

	function handleToggleItem(id) {
		setItems((items) =>
			items.map((item) =>
				item.id === id ? { ...item, packed: !item.packed } : item
			)
		);
	}

	return (
		<div className="app">
			<Logo />
			<Form onAddItems={handleAddItems} />
			<PackingList
				items={items}
				onClearItems={handleClearItems}
				onDeleteItem={handleDeleteItem}
				onToggleItem={handleToggleItem}
			/>
			<Stats items={items} />
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

function PackingList({ items, onClearItems, onDeleteItem, onToggleItem }) {
	const [sortBy, setSortBy] = useState("inputOrder");

	let sortedItems;

	switch (sortBy) {
		case "description":
			sortedItems = items
				.slice()
				.sort((a, b) => a.description.localeCompare(b.description));
			break;
		case "inputOrder":
		default:
			sortedItems = items;
			break;
		case "packed":
			sortedItems = items
				.slice()
				.sort((a, b) => Number(a.packed) - Number(b.packed));
	}

	return (
		<div className="list">
			<ul>
				{sortedItems.map((item) => (
					<Item
						key={item.id}
						item={item}
						onDeleteItem={onDeleteItem}
						onToggleItem={onToggleItem}
					/>
				))}
			</ul>

			<div className="actions">
				<select
					value={sortBy}
					onChange={(event) => setSortBy(event.target.value)}
				>
					<option value="inputOrder">Sort by input order</option>
					<option value="description">Sort by description</option>
					<option value="packed">Sort by packed status</option>
				</select>
				<button onClick={onClearItems}>Clear List</button>
			</div>
		</div>
	);
}

function Item({ item, onDeleteItem, onToggleItem }) {
	return (
		<li>
			<input
				type="checkbox"
				value={item.packed}
				onChange={() => onToggleItem(item.id)}
			/>
			<span style={item.packed ? { textDecoration: "line-through" } : {}}>
				{item.quantity} {item.description}
			</span>
			<button onClick={() => onDeleteItem(item.id)}>❌</button>
		</li>
	);
}

function Stats({ items }) {
	if (!items.length)
		return (
			<footer className="stats">
				<em>Start adding some items to your packing list.</em>
			</footer>
		);

	const numItems = items.length;
	const numPacked = items.filter((item) => item.packed).length;
	const percentage = Math.round((numPacked / numItems) * 100);

	return (
		<footer className="stats">
			<em>
				{percentage === 100
					? "You got everything. Ready to go! ✈"
					: `💼 You have ${numItems} item${
							numItems > 1 ? "s" : ""
					  } on your list, and you already packed ${numPacked} (${percentage}%).`}
			</em>
		</footer>
	);
}
