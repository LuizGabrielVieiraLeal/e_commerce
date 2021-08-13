<template>
  <q-carousel
    v-model="slide"
    class="carousel"
    transition-prev="slide-right"
    transition-next="slide-left"
    swipeable
    animated
    control-color="primary"
    padding
    arrows
  >
    <q-carousel-slide :name="1" class="column no-wrap slide-content">
      <div
        class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
      >
        <template v-for="(order, index) in orders">
          <order-item
            :key="index"
            v-if="index < 4"
            :order="order"
            :isCarouselItem="true"
          />
        </template>
      </div>
    </q-carousel-slide>
    <q-carousel-slide v-if="orders.length > 4" :name="2" class="column no-wrap">
      <div
        class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
      >
        <order-item :key="index" v-if="index >= 4" :order="order" />
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>

<script>
import OrderItem from "./OrderItem.vue";

export default {
  props: {
    orders: {
      type: Array,
      required: true
    }
  },
  components: {
    OrderItem
  },
  data: () => ({
    slide: 1
  })
};
</script>

<style scoped>
.carousel {
  height: 250px;
}
</style>
