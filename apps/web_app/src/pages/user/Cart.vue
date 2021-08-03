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
              Taxa de entrega: R$
              {{
                deliveryRating
                  .toFixed(2)
                  .toString()
                  .replace(".", ",")
              }}
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
            <q-separator class="q-my-md" />
            <p class="q-my-none q-mx-md text-bold">
              Taxa de entrega: R$
              {{
                deliveryRating
                  .toFixed(2)
                  .toString()
                  .replace(".", ",")
              }}
            </p>
            <q-separator class="q-my-md" />
            <p class="q-my-none q-mx-md text-bold">
              Total: R$
              {{
                (totalPrice + deliveryRating)
                  .toFixed(2)
                  .toString()
                  .replace(".", ",")
              }}
            </p>

            <template v-if="changeFor && change > 0">
              <q-separator class="q-my-md" />
              <span class="q-my-none q-mx-md">
                Troco para: R$
                {{
                  changeFor
                    .toFixed(2)
                    .toString()
                    .replace(".", ",")
                }}
              </span>
              <q-btn
                flat
                dense
                class="q-ml-lg"
                size="sm"
                color="primary"
                label="Alterar"
                @click="changeDialog = true"
              />
              <br />
              <span class="q-my-none q-mx-md">
                Troco à receber: R$
                {{
                  change
                    .toFixed(2)
                    .toString()
                    .replace(".", ",")
                }}
              </span>
            </template>
            <template v-if="paymentMethod === 'CASH' && !changeFor">
              <q-separator class="q-my-md" />
              <span class="q-my-none q-mx-md">
                Não preciso de troco
              </span>
              <q-btn
                flat
                dense
                class="q-ml-lg"
                size="sm"
                color="primary"
                label="Alterar"
                @click="changeDialog = true"
              />
              <br />
            </template>
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

    <q-dialog v-model="changeDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Precisa de troco?</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            outlined
            mask="#,##"
            fill-mask="0"
            reverse-fill-mask
            v-model="changeForLabel"
            autofocus
            @keyup.enter="changeDialog = false"
            :rules="[
              val =>
                changeFor > totalPrice + deliveryRating ||
                'O valor do campo precisa ser maior que o valor do pedido.'
            ]"
          >
            <template v-slot:prepend>
              <small class="text-bold">R$</small>
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn
            flat
            label="Não, obrigado"
            v-close-popup
            @click="changeForLabel = null"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
    paymentMethod: null,
    changeForLabel: null,
    changeFor: 0,
    change: 0,
    step: 1,
    deliveryRating: 2,
    changeDialog: false
  }),
  computed: {
    ...mapGetters("products", ["products"]),
    ...mapGetters("cart", ["orderItems", "totalPrice"])
  },
  watch: {
    paymentMethod: function(value) {
      if (value === "CASH") this.changeDialog = true;
    },

    changeForLabel: function(value) {
      this.changeFor = parseFloat(value.replace(",", "."));
      this.change = this.changeFor - (this.totalPrice + this.deliveryRating);
    }
  },
  methods: {
    getProductName(id) {
      const product = this.products.find(product => product._id === id);
      return product.name;
    }
  }
};
</script>

<style lang="css" scoped>
.order-step {
  min-height: 65vh;
}
</style>
