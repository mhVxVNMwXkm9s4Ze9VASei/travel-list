import { useState } from "react";
import Item from "./Item";

export default function PackingList({
	items,
	onClearItems,
	onDeleteItem,
	onToggleItem,
}) {
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
			break;
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
