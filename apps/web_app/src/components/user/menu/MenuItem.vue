<template>
  <q-card class="q-mb-sm">
    <div class="row">
      <div class="col-xs-12 col-md-2">
        <q-img
          :src="
            this.product.image ||
              'https://www.corsan.com.br/themes/padrao2019/images/outros/GD_imgSemImagem.png'
          "
          :ratio="4 / 3"
        />
      </div>
      <div class="col-xs-12 col-md-10">
        <q-card-section>
          <div class="row">
            <div class="col-xs-9">
              <div class="text-h6">{{ this.product.name }}</div>
              <div class="text-subtitle2">
                R$
                {{
                  this.product.price
                    .toFixed(2)
                    .toString()
                    .replace(".", ",")
                }}
                ({{ unit }})
              </div>
              <div class="row">
                <div class="col-xs-10">
                  <p class="q-mt-xl">{{ this.product.description }}</p>
                </div>
              </div>
            </div>
            <div class="col-xs-3">
              <div class="row justify-center q-mt-sm">
                <p class="text-bold">Quantidade</p>
              </div>
              <div class="row justify-center">
                <span class="quantity-counter">{{ quantity }}</span>
              </div>
              <div class="row justify-center q-mt-md">
                <q-btn
                  @click="decrement"
                  :disabled="quantity <= 0"
                  round
                  size="xs"
                  color="primary"
                  icon="remove"
                  class="q-mr-md"
                />
                <q-btn
                  @click="increment"
                  round
                  size="xs"
                  color="primary"
                  icon="add"
                />
              </div>
            </div>
          </div>
        </q-card-section>
      </div>
    </div>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    product: {
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
    }
  },

  methods: {
    increment() {
      this.quantity++;

      const item = {
        product: this.product._id,
        quantity: this.quantity,
        total: this.product.price * this.quantity
      };

      this.updateCartItems(item);
    },

    decrement() {
      this.quantity--;

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
