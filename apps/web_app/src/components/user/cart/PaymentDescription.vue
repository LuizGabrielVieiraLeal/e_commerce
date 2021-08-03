<template>
  <div>
    <q-item-label header>
      Descrição do pagamento
    </q-item-label>

    <template v-for="orderItem in orderItems">
      <p :key="orderItem.product" class="q-my-none q-mx-md text-bold">
        {{
          `${orderItem.quantity} ${getProductName(
            orderItem.product
          )}: R$ ${orderItem.total
            .toFixed(2)
            .toString()
            .replace(".", ",")}`
        }}
      </p>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("products", ["products"]),
    ...mapGetters("cart", ["orderItems"])
  },
  methods: {
    getProductName(id) {
      const product = this.products.find(product => product._id === id);
      return product.name;
    }
  }
};
</script>
