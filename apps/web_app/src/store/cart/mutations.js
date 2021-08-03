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

export function setPaymentMethod(state, paymentMethod) {
  state.paymentMethod = paymentMethod;
}

export function setChangeFor(state, changeFor) {
  state.changeFor = changeFor;
}

export function setChange(state, change) {
  state.change = change;
}
