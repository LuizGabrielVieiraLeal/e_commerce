<template>
  <q-page class="q-pl-lg">
    <div class="row">
      <div class="col-xs-10">
        <h5>Últimos pedidos</h5>
      </div>
      <div class="col-xs-2 q-mt-lg">
        <div class="row justify-end q-mt-lg">
          <q-btn flat color="primary" label="Ver todos" />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12">
        <order-carousel />
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12">
        <h5>Menu</h5>
      </div>
    </div>

    <menu-tabs />
  </q-page>
</template>

<script>
import OrderCarousel from "../../components/user/order_carousel/OrderCarousel.vue";
import MenuTabs from "../../components/user/menu/MenuTabs.vue";

export default {
  components: {
    OrderCarousel,
    MenuTabs
  }
};
</script>

<style scoped></style>
