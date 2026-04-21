import { Link } from "react-router-dom";
import { isDeliveredStatus } from "../utils/order-utils";

const DisplayComponent = ({ order, onMarkDelivered }) => {
	if (!order) {
		return null;
	}

	const orderId = order.orderId ?? "N/A";
	const customerName = order.customerName || "unknown";
	const restaurantName = order.restaurant || "Unknown Restaurant";
	const totalAmountNumber = Number(order.totalAmount);
	const totalAmount = Number.isFinite(totalAmountNumber)
		? totalAmountNumber.toFixed(2)
		: "N/A";
	const status = order.status || "Unknown";
	const hasRating = Number.isFinite(Number(order.rating));
	const statusClass = `status-pill status-${String(status)
		.toLowerCase()
		.replace(/[^a-z]/g, "-")}`;

	return (
		<article className="order-card" data-testid="order-item">
			<div className="order-card__row">
				<h3>Order #{orderId}</h3>
				<span className={statusClass}>{status}</span>
			</div>

			<p>
				<strong>Customer:</strong> {customerName}
			</p>
			<p>
				<strong>Restaurant:</strong> {restaurantName}
			</p>
			<p>
				<strong>Total Amount:</strong> Rs {totalAmount}
			</p>

			{hasRating ? (
				<p>
					<strong>Rating:</strong> {Number(order.rating)}
				</p>
			) : null}

			<div className="order-card__actions">
				<Link className="btn-link" to={`/orders/${orderId}`}>
					View Details
				</Link>

				{!isDeliveredStatus(status) && typeof onMarkDelivered === "function" ? (
					<button
						type="button"
						className="btn-action"
						onClick={() => onMarkDelivered(orderId)}
					>
						Mark as Delivered
					</button>
				) : null}
			</div>
		</article>
	);
};

export default DisplayComponent;
