<template>
  <div>
    <q-card
      :class="isCarouselItem ? 'q-mr-md order-card' : 'q-mt-md'"
      @click="dialog = true"
    >
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
              Código do pedido:
              <span class="text-primary">{{ order._id }}</span>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div
          v-if="order.status !== 'DELIVERED' && order.status !== 'CANCELLED'"
          class="row"
        >
          <div :class="isCarouselItem ? 'col-xs-2' : 'col-xs-1'">
            <span class="pulse q-mt-md q-ml-xs"></span>
          </div>
          <div :class="isCarouselItem ? 'col-xs-10' : 'col-xs-11'">
            <p class="text-bold q-mt-md">
              {{ statusLabel }}
            </p>
          </div>
        </div>
        <div v-else class="row">
          <div class="col-xs-12 text-bold text-primary">
            <q-badge
              class="q-mt-md"
              outline
              color="primary"
              :label="statusLabel"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-dialog v-model="dialog">
      <order-card-dialog :order="order" />
    </q-dialog>
  </div>
</template>

<script>
import OrderCardDialog from "./OrderCardDialog.vue";

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
  components: {
    OrderCardDialog
  },
  data: () => ({
    dialog: false,
    day: null,
    month: null
  }),
  computed: {
    statusLabel() {
      switch (this.order.status) {
        case "PENDING":
          return "Aguardando aprovação do restaurante";
        case "ON_THE_WAY":
          return "Seu pedido está a caminho";
        case "DELIVERED":
          return "Entregue";
        case "CANCELLED":
          return "Cancelado";
        default:
          return "Seu pedido está sendo preparado";
      }
    }
  },
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
