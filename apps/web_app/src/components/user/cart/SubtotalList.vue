<template>
  <q-list padding>
    <q-item-label header>
      Subtotal: R$
      {{
        totalPrice
          .toFixed(2)
          .toString()
          .replace(".", ",")
      }}
    </q-item-label>

    <template v-for="orderItem in orderItems">
      <subtotal-list-item
        :key="orderItem.product"
        :product="getProduct(orderItem.product)"
        :orderItem="orderItem"
      />
    </template>
  </q-list>
</template>

<script>
import { mapGetters } from "vuex";
import SubtotalListItem from "./SubtotalListItem.vue";

export default {
  components: {
    SubtotalListItem
  },
  computed: {
    ...mapGetters("cart", ["orderItems", "totalPrice"]),
    ...mapGetters("products", ["products"])
  },
  methods: {
    getProduct(id) {
      return this.products.find(product => product._id === id);
    }
  }
};
</script>
