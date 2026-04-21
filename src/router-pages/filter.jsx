import { useMemo, useState } from "react";
import DisplayComponent from "../components/display-component";
import { useAppContext } from "../context/AppContext";

const Filter = () => {
	const { validOrders, loading, error } = useAppContext();
	const [filterInput, setFilterInput] = useState("");
	const [submittedValue, setSubmittedValue] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const filteredOrders = useMemo(() => {
		if (!submittedValue) {
			return [];
		}

		return validOrders.filter(
			(order) => order?.restaurant === submittedValue,
		);
	}, [validOrders, submittedValue]);

	const handleFilterSubmit = (event) => {
		event.preventDefault();
		const trimmedInput = filterInput.trim();

		if (!trimmedInput) {
			setSubmittedValue("");
			setErrorMessage("Please enter a restaurant name.");
			return;
		}

		setSubmittedValue(trimmedInput);
		setErrorMessage("");
	};

	if (loading) {
		return (
			<section className="page">
				<h2>Filter Orders</h2>
				<p>Loading orders...</p>
			</section>
		);
	}

	if (error) {
		return (
			<section className="page">
				<h2>Filter Orders</h2>
				<p>{error}</p>
			</section>
		);
	}

	return (
		<section className="page">
			<h2>Filter Orders By Restaurant</h2>

			<form className="filter-form" onSubmit={handleFilterSubmit}>
				<input
					data-testid="filter-input"
					className="filter-input"
					type="text"
					value={filterInput}
					onChange={(event) => setFilterInput(event.target.value)}
					placeholder="Enter exact restaurant name"
				/>
				<button type="submit" className="btn-action">
					Apply Filter
				</button>
			</form>

			{errorMessage ? <p className="error-text">{errorMessage}</p> : null}

			{!errorMessage && submittedValue && filteredOrders.length === 0 ? (
				<p>no results found.</p>
			) : null}

			<div className="order-grid">
				{filteredOrders.map((order) => (
					<DisplayComponent key={order.orderId} order={order} />
				))}
			</div>
		</section>
	);
};

export default Filter;
