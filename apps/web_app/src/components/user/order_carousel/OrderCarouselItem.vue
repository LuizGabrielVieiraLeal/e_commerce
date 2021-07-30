<template>
  <q-card class="q-mr-md order-card">
    <q-card-section>
      <div class="row">
        <div class="col-xs-3">
          <span class="date">
            <span class="day-label">20</span><br />
            <span class="month-label">12</span>
          </span>
        </div>
        <div class="col-xs-9">
          <div>
            Código: <span class="text-primary text-bold">#6k78ds123asdf</span>
          </div>
          <div class="text-subtitle2">R$ 30,00</div>
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <div :v-if="this.status === 0" class="row">
        <div class="col-xs-2">
          <span class="pulse"></span>
        </div>
        <div class="col-xs-10">
          <p class="text-bold">Seu pedido está à caminho.</p>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: {
    status: {
      type: Number,
      required: true
    }
  }
};
</script>
