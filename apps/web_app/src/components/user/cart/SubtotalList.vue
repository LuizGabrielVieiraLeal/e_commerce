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

    <template v-for="item in orderItems">
      <subtotal-list-item
        :key="item.product"
        :product="getProduct(item.product)"
        :orderItem="item"
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
      return this.products.filter(product => product._id === id)[0];
    }
  }
};
</script>
