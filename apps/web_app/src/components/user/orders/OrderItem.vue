<template>
  <q-card :class="isCarouselItem ? 'q-mr-md order-card' : 'q-mt-md'">
    <q-card-section>
      <div class="row">
        <div :class="isCarouselItem ? 'col-xs-3' : 'col-xs-1'">
          <span class="date">
            <span class="day-label">{{ day }}</span
            ><br />
            <span class="month-label">{{ month }}</span>
          </span>
        </div>
        <div :class="isCarouselItem ? 'col-xs-9' : 'col-xs-11'">
          <div class="text-bold">
            Código do pedido: <span class="text-primary">{{ order._id }}</span>
          </div>
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <div v-if="order.status !== 'DELIVERED'" class="row">
        <div :class="isCarouselItem ? 'col-xs-2' : 'col-xs-1'">
          <span class="pulse q-mt-md q-ml-xs"></span>
        </div>
        <div :class="isCarouselItem ? 'col-xs-10' : 'col-xs-11'">
          <p class="text-bold q-mt-md">
            Aguardando a aprovação do restaurante.
          </p>
        </div>
      </div>
      <div v-if="order.status === 'DELIVERED'" class="row">
        <div class="col-xs-12 text-bold text-primary">
          <q-badge class="q-mt-md" outline color="primary" label="Entrgue" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      required: true
    },
    isCarouselItem: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    day: null,
    month: null
  }),
  created: function() {
    let date = this.order.createdAt.split("T")[0];
    this.day = date.split("-")[2];
    this.month = date.split("-")[1];
  }
};
</script>

<style lang="css" scoped>
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
