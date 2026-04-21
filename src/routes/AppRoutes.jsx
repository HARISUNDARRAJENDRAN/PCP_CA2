import { Navigate, Route, Routes } from "react-router-dom";
import Filter from "../router-pages/filter";
import OrdersDataId from "../router-pages/orders-dataid";
import Orders from "../router-pages/orders";
import Stats from "../router-pages/stats";

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/orders" replace />} />
			<Route path="/orders" element={<Orders />} />
			<Route path="/orders/:id" element={<OrdersDataId />} />
			<Route path="/filter" element={<Filter />} />
			<Route path="/stats" element={<Stats />} />
			<Route
				path="*"
				element={
					<section className="page">
						<h2>Page not found</h2>
					</section>
				}
			/>
		</Routes>
	);
};

export default AppRoutes;
