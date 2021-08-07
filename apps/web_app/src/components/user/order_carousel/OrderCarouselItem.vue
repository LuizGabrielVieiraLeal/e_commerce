<template>
  <q-card class="q-mr-md order-card">
    <q-card-section>
      <div class="row">
        <div class="col-xs-3">
          <span class="date">
            <span class="day-label">{{ day }}</span
            ><br />
            <span class="month-label">{{ month }}</span>
          </span>
        </div>
        <div class="col-xs-9">
          <div class="text-bold">
            Código do pedido: <span class="text-primary">{{ order._id }}</span>
          </div>
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <div v-if="order.status === 'WAITING_PAYMENT'" class="row">
        <div class="col-xs-2">
          <span class="pulse q-mt-md q-ml-xs"></span>
        </div>
        <div class="col-xs-10">
          <p class="text-bold q-mt-md">
            Aguardando a aprovação do restaurante.
          </p>
        </div>
      </div>
      <div v-if="order.status === 'ON_THE_WAY'" class="row">
        <div class="col-xs-2">
          <span class="pulse q-mt-md q-ml-xs"></span>
        </div>
        <div class="col-xs-10">
          <p class="text-bold q-mt-md">Seu pedido está a caminho.</p>
        </div>
      </div>
      <div v-if="order.status === 'DELIVERED'" class="row">
        <div class="col-xs-10 text-bold text-primary">
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
