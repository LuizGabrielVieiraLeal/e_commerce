<template>
  <q-page>
    <q-parallax :height="600" :speed="0.5" class="q-mt-xs">
      <template v-slot:media>
        <img
          src="https://www.ceres.org/sites/default/files/2019-01/fast-food-banner.jpg"
        />
      </template>
      <h2 class="text-white text-weight-bold">Bateu aquela fome?</h2>
      <p class="text-primary text-weight-bold sub-text">
        Peça o rango do conforto de sua casa e deixe o resto com a gente =)
      </p>
    </q-parallax>

    <div class="row">
      <div class="col-xs-12 col-md-4 q-pa-lg">
        <q-card class="no-shadow">
          <q-card-section>
            <div class="row">
              <div class="col-3 flex flex-center">
                <q-icon name="payment" class="text-primary" size="5em" />
              </div>
              <div class="col-9 flex flex-center text-h6">
                Escolha a forma de pagamento de sua preferência.
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-12 col-md-4 q-pa-lg">
        <q-card class="no-shadow">
          <q-card-section>
            <div class="row">
              <div class="col-3 flex flex-center">
                <q-icon name="schedule" class="text-primary" size="5em" />
              </div>
              <div class="col-9 flex flex-center text-h6">
                Acompanhe o andamento de seus pedidos.
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-12 col-md-4 q-pa-lg">
        <q-card class="no-shadow">
          <q-card-section>
            <div class="row">
              <div class="col-3 flex flex-center">
                <q-icon name="location_on" class="text-primary" size="5em" />
              </div>
              <div class="col-9 flex flex-center text-h6">
                Receba seu pedido no conforto de sua casa.
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {};
</script>

<style scoped>
.sub-text {
  margin-top: -50px;
}
</style>
