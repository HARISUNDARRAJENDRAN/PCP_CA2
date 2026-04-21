/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { getDataset, getToken } from "../api/api";
import AppReducer, { initialState } from "../reducer/AppReducer";
import { isOrderValid } from "../utils/order-utils";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    let isMounted = true;

    const fetchOrders = async () => {
      dispatch({ type: "FETCH_START" });

      try {
        const tokenRes = await getToken("E0123001", "621147", "setA");
        const dataset = await getDataset(tokenRes.token, tokenRes.dataUrl);

        if (!isMounted) {
          return;
        }

        dispatch({ type: "FETCH_SUCCESS", payload: dataset });
      } catch (error) {
        if (!isMounted) {
          return;
        }

        dispatch({
          type: "FETCH_ERROR",
          payload: error?.message || "Unable to fetch orders.",
        });
      }
    };

    fetchOrders();

    return () => {
      isMounted = false;
    };
  }, []);

  const validOrders = useMemo(
    () => state.contextData.filter((order) => isOrderValid(order)),
    [state.contextData],
  );

  const markOrderDelivered = (orderId) => {
    dispatch({ type: "MARK_AS_DELIVERED", payload: orderId });
  };

  const value = useMemo(
    () => ({
      contextData: state.contextData,
      validOrders,
      loading: state.loading,
      error: state.error,
      markOrderDelivered,
    }),
    [state.contextData, validOrders, state.loading, state.error],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within AppProvider.");
  }

  return context;
};