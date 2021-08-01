export function storeProducts(context, products) {
  context.commit("setProducts", products);
}
