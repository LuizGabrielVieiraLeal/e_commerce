<template>
  <q-dialog v-model="cartDialog" position="bottom" seamless>
    <q-card style="width: 265px">
      <q-card-section>
        <div class="row">
          <div class="col-xs-3">
            <div class="row justify-center">
              <q-btn
                class="q-mr-md"
                round
                color="primary"
                icon="shopping_basket"
                to="/user/cart"
              >
                <q-badge v-if="totalItems > 0" color="green" floating>{{
                  totalItems
                }}</q-badge>
              </q-btn>
            </div>
          </div>
          <div class="col-xs-9 q-px-lg">
            <div class="text-weight-bold">
              R$
              {{
                totalPrice
                  .toFixed(2)
                  .toString()
                  .replace(".", ",")
              }}
            </div>
            <div class="text-grey">{{ totalItems }} itens na sacola</div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    cartDialog: {
      get: function() {
        return this.totalItems > 0;
      }
    },

    ...mapGetters("cart", ["totalItems", "totalPrice"])
  }
};
</script>
