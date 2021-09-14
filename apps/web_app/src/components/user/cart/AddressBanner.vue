<template>
  <div>
    <q-banner v-if="address" class="address-banner text-primary">
      <p class="text-bold">Entregar em:</p>
      <p class="q-my-none">
        {{ address.street }}, n° {{ address.number }}, {{ address.district }},
        {{ address.city }} -
        {{ address.state }}
      </p>
      <p>
        CEP: {{ address.zipCode.substr(0, 5) }}-{{ address.zipCode.substr(5) }}
      </p>
      <p>{{ address.complement }}</p>
      <template v-slot:action>
        <q-btn flat color="primary" label="Atualizar" />
      </template>
    </q-banner>
    <q-banner v-else class="address-banner text-primary q-pl-xl">
      <q-icon name="information" class="q-ml-xl" size="sm" />
      <span class="text-bold">Nenhum endereço disponível para entrega.</span>
    </q-banner>
    <q-dialog
      v-model="persistent"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="bg-teal text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Persistent</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Click/Tap on the backdrop.
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: {
    address: {
      required: true
    }
  },
  data: () => ({
    persistent: false
  }),
  created: function() {
    this.persistent = this.address ? false : true;
  }
};
</script>

<style lang="stylus" scoped>
.address-banner {
  background-color: rgba(207, 23, 23, 0.1)
}
</style>
