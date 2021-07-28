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
        <order-carousel-item :status="0" />

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
              <div class="col-xs-3">
                <span class="date">
                  <span class="day-label">20</span><br />
                  <span class="month-label">12</span>
                </span>
              </div>
              <div class="col-xs-9">
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
                <q-badge outline color="black" label="Cancelado" />
              </div>
            </div>
          </q-card-section>
        </q-card>
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
              <div class="col-xs-3">
                <span class="date">
                  <span class="day-label">20</span><br />
                  <span class="month-label">12</span>
                </span>
              </div>
              <div class="col-xs-9">
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
                <q-badge outline color="black" label="Cancelado" />
              </div>
            </div>
          </q-card-section>
        </q-card>
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
              <div class="col-xs-3">
                <span class="date">
                  <span class="day-label">20</span><br />
                  <span class="month-label">12</span>
                </span>
              </div>
              <div class="col-xs-9">
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
                <q-badge outline color="black" label="Cancelado" />
              </div>
            </div>
          </q-card-section>
        </q-card>
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
              <div class="col-xs-3">
                <span class="date">
                  <span class="day-label">20</span><br />
                  <span class="month-label">12</span>
                </span>
              </div>
              <div class="col-xs-9">
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
  </q-carousel>
</template>

<script>
import OrderCarouselItem from "./OrderCarouselItem.vue";

export default {
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
