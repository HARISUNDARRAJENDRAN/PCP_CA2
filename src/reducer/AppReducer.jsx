export const initialState = {
	contextData: [],
	loading: true,
	error: "",
};

const AppReducer = (state, action) => {
	switch (action.type) {
		case "FETCH_START":
			return {
				...state,
				loading: true,
				error: "",
			};

		case "FETCH_SUCCESS":
			return {
				...state,
				contextData: Array.isArray(action.payload) ? action.payload : [],
				loading: false,
				error: "",
			};

		case "FETCH_ERROR":
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		case "MARK_AS_DELIVERED":
			return {
				...state,
				contextData: state.contextData.map((order) =>
					String(order?.orderId) === String(action.payload)
						? {
								...order,
								status: "Delivered",
							}
						: order,
				),
			};

		default:
			return state;
	}
};

export default AppReducer;