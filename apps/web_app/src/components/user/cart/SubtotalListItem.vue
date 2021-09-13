<template>
  <div>
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
            @click="checkItems"
            :disabled="quantity <= 0"
            color="primary"
            round
            dense
            size="xs"
            icon="remove"
          />
          <span class="text-bold q-mx-md">{{ quantity }}</span>
          <q-btn
            @click="increment"
            color="primary"
            round
            dense
            size="xs"
            icon="add"
          />
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="primary" text-color="white" />
          <span class="q-ml-sm text-bold"
            >Tem certeza que deseja remover este item da sacola?</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Fechar" color="primary" v-close-popup />
          <q-btn label="Sim" color="primary" @click="decrement" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
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
    quantity: 0,
    confirm: false
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

    ...mapGetters("cart", ["orderItems", "totalPrice", "totalItems"])
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

    checkItems() {
      if (this.totalItems === 1) this.confirm = true;
      else this.decrement();
    },

    ...mapActions("cart", ["updateCartItems"])
  }
};
</script>
