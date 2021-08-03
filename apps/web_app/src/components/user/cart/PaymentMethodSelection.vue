<template>
  <div>
    <q-item-label header>
      Escolha a forma de pagamento
    </q-item-label>

    <q-radio
      class="q-ml-xs q-mr-md"
      v-model="paymentMethod"
      val="CASH"
      label="Dinheiro"
    />
    <q-radio
      v-model="paymentMethod"
      val="CREDIT_CARD"
      label="Cartão de crédito"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    paymentMethod: null
  }),
  watch: {
    paymentMethod: function(value) {
      this.updatePaymentMethod(value);
    }
  },
  methods: {
    ...mapActions("cart", ["updatePaymentMethod"])
  }
};
</script>
