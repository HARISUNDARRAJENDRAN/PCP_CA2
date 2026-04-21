import { NavLink } from "react-router-dom";

const getNavClass = ({ isActive }) =>
	isActive ? "nav-link nav-link-active" : "nav-link";

const Header = () => {
	return (
		<header className="app-header">
			<div className="app-header__content">
				<h1 className="app-title">Food Delivery Orders</h1>

				<nav className="nav-links">
					<NavLink to="/orders" className={getNavClass}>
						Orders
					</NavLink>
					<NavLink to="/filter" className={getNavClass}>
						Filter
					</NavLink>
					<NavLink to="/stats" className={getNavClass}>
						Stats
					</NavLink>
				</nav>
			</div>
		</header>
	);
};

export default Header;
