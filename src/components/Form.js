import { useState } from "react";

export default function Form({ onAddItems }) {
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
