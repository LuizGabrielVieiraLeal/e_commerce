<template>
  <q-card class="q-mb-sm menu-item-card">
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
            <div class="col-xs-6">
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
            <div class="col-xs-6 row justify-end content-center q-pr-md">
              <div>
                <q-btn
                  @click="decrement"
                  :disabled="quantity <= 0"
                  round
                  size="xs"
                  color="primary"
                  icon="remove"
                  class="q-mr-md q-mt-md"
                />
              </div>
              <div class="q-mt-xs">
                <span class="quantity-counter">{{ quantity }}</span>
              </div>
              <div>
                <q-btn
                  @click="increment"
                  round
                  size="xs"
                  color="primary"
                  icon="add"
                  class="q-ml-md q-mt-md"
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
import { mapActions, mapGetters } from "vuex";

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

    ...mapGetters("cart", ["orderItems"])
  },
  mounted: function() {
    this.orderItems.forEach(orderItem => {
      if (orderItem.product === this.product._id)
        this.quantity = orderItem.quantity;
    });
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

<style lang="css" scoped>
.quantity-counter {
  font-size: 30px;
  font-weight: bolder;
}
</style>
