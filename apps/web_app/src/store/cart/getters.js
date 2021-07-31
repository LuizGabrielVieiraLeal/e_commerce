export function orderItems(state) {
  return state.orderItems;
}

export function total(state) {
  return state.orderItems.reduce((sum, orderItem) => sum + orderItem.total, 0);
}
