<template>
  <q-page class="q-pl-lg">
    <div class="row">
      <div class="col-xs-12">
        <h5>Sacola</h5>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <q-stepper
          v-model="step"
          ref="stepper"
          color="primary"
          class="no-shadow"
          animated
        >
          <q-step
            :name="1"
            title="Detalhes do pedido"
            icon="receipt"
            active-icon="receipt"
            :done="step > 1"
            class="order-step"
          >
            <address-banner />
            <q-separator class="q-mt-lg" />
            <subtotal-list />
            <q-separator />
            <q-item-label header>
              Taxa de entrega: R$ 2,00
            </q-item-label>
            <q-separator />
            <q-item-label header class="text-bold">
              Total: R$
              {{
                (totalPrice + deliveryRating)
                  .toFixed(2)
                  .toString()
                  .replace(".", ",")
              }}
            </q-item-label>
          </q-step>

          <q-step
            :name="2"
            title="Pagamento"
            icon="monetization_on"
            active-icon="monetization_on"
            :done="step > 2"
            class="order-step"
          >
            An ad group contains one or more ads which target a shared set of
            keywords.
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation class="row justify-end">
              <q-btn
                v-if="step === 2"
                flat
                color="primary"
                @click="$refs.stepper.previous()"
                label="Voltar"
                class="q-mr-sm"
              />
              <q-btn
                v-if="step < 3"
                @click="$refs.stepper.next()"
                color="primary"
                :label="step === 2 ? 'Fazer pedido' : 'Continuar'"
              />
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";

import AddressBanner from "../../components/user/cart/AddressBanner.vue";
import SubtotalList from "../../components/user/cart/SubtotalList.vue";

export default {
  components: {
    AddressBanner,
    SubtotalList
  },
  data: () => ({
    step: 1,
    deliveryRating: 2
  }),
  computed: {
    ...mapGetters("cart", ["totalPrice"])
  }
};
</script>

<style lang="css" scoped>
.order-step {
  min-height: 65vh;
}
</style>
