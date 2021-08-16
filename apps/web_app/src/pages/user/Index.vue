<template>
  <q-page class="q-pl-lg">
    <div class="row" v-if="orders && orders.length > 0">
      <div class="col-xs-10">
        <h5>Últimos pedidos</h5>
      </div>
      <div class="col-xs-2 q-mt-lg">
        <div class="row justify-end q-mt-lg">
          <q-btn flat color="primary" label="Ver todos" />
        </div>
      </div>
    </div>

    <div class="row" v-if="orders && orders.length > 0">
      <div class="col-xs-12">
        <order-carousel :orders="orders" />
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12">
        <h5>Menu</h5>
      </div>
    </div>

    <menu-tabs />
    <bottom-sheet />
  </q-page>
</template>

<script>
import gql from "graphql-tag";
import OrderCarousel from "../../components/user/orders/OrderCarousel.vue";
import MenuTabs from "../../components/user/menu/MenuTabs.vue";
import BottomSheet from "../../components/user/cart/BottomSheet.vue";

export default {
  components: {
    OrderCarousel,
    MenuTabs,
    BottomSheet
  },
  apollo: {
    orders: {
      query: gql`
        query {
          orders(limit: 8, orderBy: createdAt_DESC) {
            _id
            items {
              product {
                name
                price
                unit
              }
              quantity
              total
            }
            total
            paymentMethod
            changeFor
            change
            status
            createdAt
          }
        }
      `,
      fetchPolicy: "no-cache"
    }
  }
};
</script>
