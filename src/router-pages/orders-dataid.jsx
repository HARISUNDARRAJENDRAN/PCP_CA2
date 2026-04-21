import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { calculateItemsSubtotal } from "../utils/order-utils";

const OrdersDataId = () => {
	const { id } = useParams();
	const { contextData, loading, error } = useAppContext();

	if (loading) {
		return (
			<section className="page">
				<h2>Order Details</h2>
				<p>Loading order...</p>
			</section>
		);
	}

	if (error) {
		return (
			<section className="page">
				<h2>Order Details</h2>
				<p>{error}</p>
			</section>
		);
	}

	const selectedOrder = contextData.find(
		(order) => String(order?.orderId) === String(id),
	);

	if (!selectedOrder) {
		return (
			<section className="page">
				<h2>Order Details</h2>
				<p>order not found</p>
				<Link to="/orders" className="btn-link inline-link">
					Back to Orders
				</Link>
			</section>
		);
	}

	const items = Array.isArray(selectedOrder.items) ? selectedOrder.items : [];
	const subtotal = calculateItemsSubtotal(items);
	const totalAmount = Number(selectedOrder.totalAmount);

	return (
		<section className="page">
			<h2>Order #{selectedOrder.orderId ?? "N/A"}</h2>

			<p>
				<strong>Customer:</strong> {selectedOrder.customerName || "unknown"}
			</p>
			<p>
				<strong>Restaurant:</strong> {selectedOrder.restaurant || "Unknown Restaurant"}
			</p>
			<p>
				<strong>Status:</strong> {selectedOrder.status || "Unknown"}
			</p>
			<p>
				<strong>Recorded Total Amount:</strong>{" "}
				{Number.isFinite(totalAmount) ? `Rs ${totalAmount.toFixed(2)}` : "N/A"}
			</p>

			<h3>Items</h3>
			<ul className="item-list">
				{items.length > 0 ? (
					items.map((item, index) => {
						const price = Number(item?.price);
						const quantity = Number(item?.quantity);
						const safePrice = Number.isFinite(price) ? price : 0;
						const safeQuantity = Number.isFinite(quantity) ? quantity : 0;
						const lineSubtotal = safePrice * safeQuantity;

						return (
							<li
								className="item-row"
								key={`${item?.name || "Unknown Item"}-${index}`}
							>
								<span className="item-main">{item?.name || "Unknown Item"}</span>
								<span>
									Rs {safePrice.toFixed(2)} x {safeQuantity} = Rs {lineSubtotal.toFixed(2)}
								</span>
							</li>
						);
					})
				) : (
					<li className="item-row">No items available.</li>
				)}
			</ul>

			<p className="detail-total">
				<strong>Calculated Subtotal:</strong> Rs {subtotal.toFixed(2)}
			</p>

			<Link to="/orders" className="btn-link inline-link">
				Back to Orders
			</Link>
		</section>
	);
};

export default OrdersDataId;


