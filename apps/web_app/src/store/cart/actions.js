export function updateCartItems(context, item) {
  if (item.quantity > 0) context.commit("updateItem", item);
  else context.commit("removeItem", item);
}

export function updatePaymentMethod(context, paymentMethod) {
  context.commit("setPaymentMethod", paymentMethod);
}

export function updateChangeFor(context, changeFor) {
  context.commit("setChangeFor", changeFor);
}

export function updateChange(context, change) {
  context.commit("setChange", change);
}
