import DisplayComponent from "../components/display-component";
import { useAppContext } from "../context/AppContext";

const Orders = () => {
	const { validOrders, loading, error, markOrderDelivered } = useAppContext();

	if (loading) {
		return (
			<section className="page">
				<h2>Orders</h2>
				<p>Loading orders...</p>
			</section>
		);
	}

	if (error) {
		return (
			<section className="page">
				<h2>Orders</h2>
				<p>{error}</p>
			</section>
		);
	}

	return (
		<section className="page">
			<h2>Valid Orders</h2>
			<p className="page-description">
				Showing only orders with valid items and valid total amounts.
			</p>

			<div className="order-grid">
				{validOrders.map((order) => (
					<DisplayComponent
						key={order.orderId}
						order={order}
						onMarkDelivered={markOrderDelivered}
					/>
				))}
			</div>

			{validOrders.length === 0 ? <p>No valid orders available.</p> : null}
		</section>
	);
};

export default Orders;
