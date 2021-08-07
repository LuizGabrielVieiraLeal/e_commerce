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
          <order-carousel-item :key="index" v-if="index < 4" :order="order" />
        </template>
      </div>
    </q-carousel-slide>
    <q-carousel-slide v-if="orders.length > 4" :name="2" class="column no-wrap">
      <div
        class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
      >
        <order-carousel-item :key="index" v-if="index >= 4" :order="order" />
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>

<script>
import OrderCarouselItem from "./OrderCarouselItem.vue";

export default {
  props: {
    orders: {
      type: Array,
      required: true
    }
  },
  components: {
    OrderCarouselItem
  },
  data: () => ({
    slide: 1
  })
};
</script>

<style>
.carousel {
  height: 250px;
}
.order-card {
  min-width: 270px;
  max-width: 400px;
}
.date {
  font-size: 25px;
  font-weight: bolder;
}
.day-label {
  text-decoration: underline;
}
.month-label {
  position: absolute;
  margin-top: -10px;
}
</style>
