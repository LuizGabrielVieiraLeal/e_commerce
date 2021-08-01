<template>
  <q-page class="q-pl-lg">
    <div class="row">
      <div class="col-xs-12">
        <h5>Sacola</h5>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <q-stepper
          v-model="step"
          ref="stepper"
          color="primary"
          class="no-shadow"
          animated
        >
          <q-step
            :name="1"
            title="Detalhes do pedido"
            icon="receipt"
            active-icon="receipt"
            :done="step > 1"
            class="order-step"
          >
            For each ad campaign that you create, you can control how much
            you're willing to spend on clicks and conversions, which networks
            and geographical locations you want your ads to show on, and more.
          </q-step>

          <q-step
            :name="2"
            title="Endereço de entrega"
            icon="room"
            active-icon="room"
            :done="step > 2"
            class="order-step"
          >
            An ad group contains one or more ads which target a shared set of
            keywords.
          </q-step>

          <q-step
            :name="3"
            title="Detalhes de pagamento"
            icon="monetization_on"
            active-icon="monetization_on"
            :done="step > 3"
            class="order-step"
          >
            An ad group contains one or more ads which target a shared set of
            keywords.
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation class="row justify-end">
              <q-btn
                v-if="step === 2"
                flat
                color="primary"
                @click="$refs.stepper.previous()"
                label="Voltar"
                class="q-mr-sm"
              />
              <q-btn
                v-if="step < 3"
                @click="$refs.stepper.next()"
                color="primary"
                :label="step === 2 ? 'Fazer pedido' : 'Continuar'"
              />
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data: () => ({
    step: 1
  })
};
</script>

<style lang="css" scoped>
.order-step {
  min-height: 67vh;
}
</style>
