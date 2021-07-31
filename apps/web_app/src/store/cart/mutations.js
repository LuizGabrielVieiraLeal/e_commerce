export function updateItem(state, item) {
  let index = state.orderItems.findIndex(
    orderItem => orderItem.product === item.product
  );

  if (index < 0) {
    state.orderItems.push(item);
  } else {
    state.orderItems[index].quantity = item.quantity;
    state.orderItems[index].total = item.total;
  }
}

export function removeItem(state, item) {
  let index = state.orderItems.findIndex(
    orderItem => orderItem.product === item.product
  );

  if (index >= 0) state.orderItems.splice(index, 1);
}
