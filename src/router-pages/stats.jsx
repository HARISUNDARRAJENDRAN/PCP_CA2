import { useEffect, useMemo } from "react";
import { useAppContext } from "../context/AppContext";
import { isCancelledStatus, isDeliveredStatus } from "../utils/order-utils";

const Stats = () => {
	const { validOrders, loading, error } = useAppContext();

	const orderStats = useMemo(
		() =>
			validOrders.reduce(
				(accumulator, order) => {
					accumulator.totalOrder += 1;

					if (isDeliveredStatus(order?.status)) {
						accumulator.deliveredOrders += 1;
					}

					if (isCancelledStatus(order?.status)) {
						accumulator.cancelledOrders += 1;
					}

					return accumulator;
				},
				{
					totalOrder: 0,
					deliveredOrders: 0,
					cancelledOrders: 0,
				},
			),
		[validOrders],
	);

	useEffect(() => {
		window.appState = {
			totalOrder: orderStats.totalOrder,
			totalOrders: orderStats.totalOrder,
			deliveredOrders: orderStats.deliveredOrders,
			cancelledOrders: orderStats.cancelledOrders,
		};
	}, [orderStats]);

	if (loading) {
		return (
			<section className="page">
				<h2>Order Analytics</h2>
				<p>Loading stats...</p>
			</section>
		);
	}

	if (error) {
		return (
			<section className="page">
				<h2>Order Analytics</h2>
				<p>{error}</p>
			</section>
		);
	}

	return (
		<section className="page">
			<h2>Order Analytics Dashboard</h2>

			<div className="stats-grid">
				<article className="stat-card">
					<p className="stat-label">Total Valid Orders</p>
					<p className="stat-value" data-testid="total-orders">
						{orderStats.totalOrder}
					</p>
				</article>

				<article className="stat-card">
					<p className="stat-label">Delivered Orders</p>
					<p className="stat-value" data-testid="delivered-orders">
						{orderStats.deliveredOrders}
					</p>
				</article>

				<article className="stat-card">
					<p className="stat-label">Cancelled Orders</p>
					<p className="stat-value" data-testid="cancelled-orders">
						{orderStats.cancelledOrders}
					</p>
				</article>
			</div>
		</section>
	);
};

export default Stats;
