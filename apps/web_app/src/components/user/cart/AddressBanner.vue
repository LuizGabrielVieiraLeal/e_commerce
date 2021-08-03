<template>
  <q-banner class="address-banner text-primary">
    <p class="text-bold">Entregar em:</p>
    <p class="q-my-none">
      Avenida Roberto Silveira, 15, Centro, Itaocara - RJ
    </p>
    <p>Próximo ao calçadão do centenário.</p>
    <template v-slot:action>
      <q-btn flat color="primary" label="Atualizar" />
    </template>
  </q-banner>
</template>

<style lang="stylus" scoped>
.address-banner {
  background-color: rgba(207, 23, 23, 0.1)
}
</style>
