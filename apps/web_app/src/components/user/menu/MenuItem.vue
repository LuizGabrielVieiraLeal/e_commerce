<template>
  <q-card class="q-mb-sm">
    <div class="row">
      <div class="col-xs-12 col-md-2">
        <q-img
          :src="
            this.product.image ||
              'https://www.corsan.com.br/themes/padrao2019/images/outros/GD_imgSemImagem.png'
          "
          :ratio="4 / 3"
        />
      </div>
      <div class="col-xs-12 col-md-10">
        <q-card-section>
          <div class="row">
            <div class="col-xs-9">
              <div class="text-h6">{{ this.product.name }}</div>
              <div class="text-subtitle2">
                R$
                {{
                  this.product.price
                    .toFixed(2)
                    .toString()
                    .replace(".", ",")
                }}
                ({{ unit }})
              </div>
              <div class="row">
                <div class="col-xs-10">
                  <p class="q-mt-xl">{{ this.product.description }}</p>
                </div>
              </div>
            </div>
            <div class="col-xs-3">
              <div class="row justify-center q-mt-sm">
                <p class="text-bold">Quantidade</p>
              </div>
              <div class="row justify-center">
                <span class="quantity-counter">{{ quantity }}</span>
              </div>
              <div class="row justify-center q-mt-md">
                <q-btn
                  :disabled="quantity <= 0"
                  round
                  size="xs"
                  color="primary"
                  icon="chevron_left"
                  class="q-mr-md"
                />
                <q-btn round size="xs" color="primary" icon="chevron_right" />
              </div>
            </div>
          </div>
        </q-card-section>
      </div>
    </div>
  </q-card>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    quantity: 0
  }),
  computed: {
    unit: {
      get: function() {
        switch (this.product.unit) {
          case "UN":
            return "unidade";
          default:
            return null;
        }
      }
    }
  }
};
</script>
