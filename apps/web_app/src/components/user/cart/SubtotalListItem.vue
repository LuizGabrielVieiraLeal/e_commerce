<template>
  <q-item>
    <q-item-section top avatar>
      <q-avatar rounded>
        <img
          :src="
            this.product.image ||
              'https://www.strokejoinville.com.br/wp-content/uploads/sites/804/2017/05/produto-sem-imagem-1.gif'
          "
        />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ product.name }}</q-item-label>
      <q-item-label caption>
        R$
        {{
          this.product.price
            .toFixed(2)
            .toString()
            .replace(".", ",")
        }}
        ({{ unit }})
      </q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-item-label caption>
        <q-btn
          color="primary"
          round
          dense
          size="xs"
          icon="remove"
          @click="decrement"
          :disabled="quantity <= 0"
        />
        <span class="text-bold q-mx-md">{{ quantity }}</span>
        <q-btn
          color="primary"
          round
          dense
          size="xs"
          icon="add"
          @click="increment"
        />
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    product: {
      type: Object,
      required: true
    },
    orderItem: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    quantity: 0
  }),
  computed: {
    unit: {
      get: function() {
        switch (this.product.unit) {
          case "UN":
            return "unidade";
          default:
            return null;
        }
      }
    },

    step: {
      get: function() {
        switch (this.product.unit) {
          case "KG":
          case "GR":
          case "LT":
          case "M":
            return 0.5;
            break;
          default:
            return 1;
            break;
        }
      }
    },

    ...mapGetters("cart", ["orderItems", "totalPrice"])
  },
  created: function() {
    this.quantity = this.orderItem.quantity;
  },
  methods: {
    increment() {
      this.quantity += this.step;

      const item = {
        product: this.product._id,
        quantity: this.quantity,
        total: this.product.price * this.quantity
      };

      this.updateCartItems(item);
    },

    decrement() {
      this.quantity -= this.step;

      const item = {
        product: this.product._id,
        quantity: this.quantity,
        total: this.product.price * this.quantity
      };

      this.updateCartItems(item);
    },

    ...mapActions("cart", ["updateCartItems"])
  }
};
</script>
