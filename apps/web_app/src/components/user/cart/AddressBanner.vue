<template>
  <div>
    <q-banner v-if="currentUser.address" class="address-banner text-primary">
      <p class="text-bold">Entregar em:</p>
      <p class="q-my-none">
        {{ currentUser.address.street }}, n° {{ currentUser.address.number }},
        {{ currentUser.address.district }}, {{ currentUser.address.city }} -
        {{ currentUser.address.state }}
      </p>
      <p>CEP: {{ currentUser.address.zipCode }}</p>
      <p>{{ currentUser.address.complement }}</p>
      <template v-slot:action>
        <q-btn flat color="primary" label="Atualizar" />
      </template>
    </q-banner>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("user", ["currentUser"])
  }
};
</script>

<style lang="stylus" scoped>
.address-banner {
  background-color: rgba(207, 23, 23, 0.1)
}
</style>
