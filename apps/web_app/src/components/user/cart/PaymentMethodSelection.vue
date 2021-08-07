<template>
  <div>
    <q-item-label header>
      Escolha a forma de pagamento
    </q-item-label>

    <q-radio
      class="q-ml-xs q-mr-md"
      v-model="payment"
      val="CASH"
      label="Dinheiro"
    />
    <q-radio v-model="payment" val="CREDIT_CARD" label="Cartão" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    payment: null
  }),
  computed: {
    ...mapGetters("cart", ["paymentMethod"])
  },
  watch: {
    payment: function(value) {
      this.updatePaymentMethod(value);
    }
  },
  mounted: function() {
    if (this.paymentMethod) this.payment = this.paymentMethod;
  },
  methods: {
    ...mapActions("cart", ["updatePaymentMethod"])
  }
};
</script>
