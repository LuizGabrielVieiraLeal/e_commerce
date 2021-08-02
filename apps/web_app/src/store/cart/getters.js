export function orderItems(state) {
  return state.orderItems;
}

export function totalItems(state) {
  return state.orderItems.reduce(
    (sum, orderItem) => sum + orderItem.quantity,
    0
  );
}

export function totalPrice(state) {
  return state.orderItems.reduce((sum, orderItem) => sum + orderItem.total, 0);
}
