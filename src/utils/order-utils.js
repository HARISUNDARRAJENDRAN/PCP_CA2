const toNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
};

export const calculateItemsSubtotal = (items = []) => {
  if (!Array.isArray(items)) {
    return 0;
  }

  return items.reduce((accumulator, item) => {
    const price = toNumber(item?.price);
    const quantity = toNumber(item?.quantity);

    if (!Number.isFinite(price) || !Number.isFinite(quantity) || quantity <= 0) {
      return accumulator;
    }

    return accumulator + price * quantity;
  }, 0);
};

const hasValidItems = (order) => {
  if (!Array.isArray(order?.items) || order.items.length === 0) {
    return false;
  }

  return order.items.every((item) => {
    const price = toNumber(item?.price);
    const quantity = toNumber(item?.quantity);

    return Number.isFinite(price) && Number.isFinite(quantity) && quantity > 0;
  });
};

const hasValidTotalAmount = (order) => {
  const totalAmount = toNumber(order?.totalAmount);

  if (!Number.isFinite(totalAmount) || totalAmount <= 0) {
    return false;
  }

  const subtotal = calculateItemsSubtotal(order?.items);

  return subtotal > 0 && Math.abs(totalAmount - subtotal) < 0.0001;
};

export const isOrderValid = (order) => {
  return hasValidItems(order) && hasValidTotalAmount(order);
};

export const isDeliveredStatus = (status) => {
  return typeof status === "string" && status.toLowerCase() === "delivered";
};

export const isCancelledStatus = (status) => {
  return typeof status === "string" && status.toLowerCase() === "cancelled";
};