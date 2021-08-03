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

export function paymentMethod(state) {
  return state.paymentMethod;
}

export function changeFor(state) {
  return state.changeFor;
}

export function change(state) {
  return state.change;
}
