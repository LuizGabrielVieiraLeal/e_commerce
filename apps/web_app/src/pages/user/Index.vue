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

    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      control-color="primary"
      padding
      arrows
      height="160px"
    >
      <q-carousel-slide :name="1" class="column no-wrap">
        <div
          class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
        >
          <q-card class="q-mr-md order-card">
            <q-card-section>
              <div class="row">
                <div class="col-xs-5">
                  <span class="date">20/12</span>
                </div>
                <div class="col-xs-7">
                  <div class="text-h6">
                    Cód: <span class="text-primary">#6k78ds</span>
                  </div>
                  <div class="text-subtitle2">R$ 30,00</div>
                </div>
              </div>
            </q-card-section>
            <q-card-section>
              <div class="row">
                <div class="col-xs-2">
                  <span class="pulse"></span>
                </div>
                <div class="col-xs-10">
                  <p class="text-bold">Seu pedido está à caminho.</p>
                </div>
              </div>
            </q-card-section>
          </q-card>
          <q-card class="q-mr-md order-card">
            <q-card-section>
              <div class="row">
                <div class="col-xs-5">
                  <span class="date">19/12</span>
                </div>
                <div class="col-xs-7">
                  <div class="text-h6">
                    Cód: <span class="text-primary">#6k78ds</span>
                  </div>
                  <div class="text-subtitle2">R$ 30,00</div>
                </div>
              </div>
            </q-card-section>
            <q-card-section>
              <div class="row">
                <div class="col-xs-10 text-bold text-primary">
                  <q-badge outline color="primary" label="Entrgue" />
                </div>
              </div>
            </q-card-section>
          </q-card>
          <q-card class="q-mr-md order-card">
            <q-card-section>
              <div class="row">
                <div class="col-xs-5">
                  <span class="date">19/12</span>
                </div>
                <div class="col-xs-7">
                  <div class="text-h6">
                    Cód: <span class="text-primary">#6k78ds</span>
                  </div>
                  <div class="text-subtitle2">R$ 30,00</div>
                </div>
              </div>
            </q-card-section>
            <q-card-section>
              <div class="row">
                <div class="col-xs-10 text-bold text-primary">
                  <q-badge outline color="primary" label="Entrgue" />
                </div>
              </div>
            </q-card-section>
          </q-card>
          <q-card class="q-mr-md order-card">
            <q-card-section>
              <div class="row">
                <div class="col-xs-5">
                  <span class="date">19/12</span>
                </div>
                <div class="col-xs-7">
                  <div class="text-h6">
                    Cód: <span class="text-primary">#6k78ds</span>
                  </div>
                  <div class="text-subtitle2">R$ 30,00</div>
                </div>
              </div>
            </q-card-section>
            <q-card-section>
              <div class="row">
                <div class="col-xs-10 text-bold text-primary">
                  <q-badge outline color="primary" label="Entrgue" />
                </div>
              </div>
            </q-card-section>
          </q-card>
          <q-card class="q-mr-md order-card">
            <q-card-section>
              <div class="row">
                <div class="col-xs-5">
                  <span class="date">19/12</span>
                </div>
                <div class="col-xs-7">
                  <div class="text-h6">
                    Cód: <span class="text-primary">#6k78ds</span>
                  </div>
                  <div class="text-subtitle2">R$ 30,00</div>
                </div>
              </div>
            </q-card-section>
            <q-card-section>
              <div class="row">
                <div class="col-xs-10 text-bold text-primary">
                  <q-badge outline color="primary" label="Entrgue" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="2" class="column no-wrap">
        <div
          class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
        >
          <q-img
            class="rounded-borders col-6 full-height"
            src="https://cdn.quasar.dev/img/parallax2.jpg"
          />
          <q-img
            class="rounded-borders col-6 full-height"
            src="https://cdn.quasar.dev/img/quasar.jpg"
          />
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="3" class="column no-wrap">
        <div
          class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
        >
          <q-img
            class="rounded-borders col-6 full-height"
            src="https://cdn.quasar.dev/img/cat.jpg"
          />
          <q-img
            class="rounded-borders col-6 full-height"
            src="https://cdn.quasar.dev/img/linux-avatar.png"
          />
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="4" class="column no-wrap">
        <div
          class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
        >
          <q-img
            class="rounded-borders col-6 full-height"
            src="https://cdn.quasar.dev/img/material.png"
          />
          <q-img
            class="rounded-borders col-6 full-height"
            src="https://cdn.quasar.dev/img/donuts.png"
          />
        </div>
      </q-carousel-slide>
    </q-carousel>
    <div class="row">
      <div class="col-xs-12">
        <h5>Menu</h5>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <q-tabs
          v-model="tab"
          align="justify"
          no-caps
          outside-arrows
          mobile-arrows
          class="bg-white text-primary"
        >
          <q-tab name="mails" label="Lanches" />
          <q-tab name="alarms" label="Pizzas" />
          <q-tab name="movies" label="Bebidas" />
        </q-tabs>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data: () => ({
    slide: 1,
    tab: "mails"
  })
};
</script>

<style scoped>
.order-card {
  width: 300px;
}
.date {
  font-size: 30px;
  font-weight: bolder;
  text-decoration: underline;
}
</style>
