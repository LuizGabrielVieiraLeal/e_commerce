<template>
  <q-page class="q-pl-lg">
    <div class="row">
      <div class="col-xs-12">
        <h5>Pedidos</h5>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12" v-for="order in orders" :key="order._id">
        <order-item :order="order" />
      </div>
    </div>
  </q-page>
</template>

<script>
import gql from "graphql-tag";
import OrderItem from "../../components/user/orders/OrderItem.vue";
export default {
  components: {
    OrderItem
  },
  apollo: {
    orders: {
      query: gql`
        query {
          orders(limit: 20, orderBy: createdAt_DESC) {
            _id
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
