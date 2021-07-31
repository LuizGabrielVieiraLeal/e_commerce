export function updateCartItems(context, item) {
  if (item.quantity > 0) context.commit("updateItem", item);
  else context.commit("removeItem", item);
}
