<template>
  <div>
    <q-tabs
      v-model="tab"
      align="justify"
      no-caps
      outside-arrows
      mobile-arrows
      class="bg-white text-primary"
    >
      <q-tab name="info" label="Informações Pessoais" />
      <q-tab name="address" label="Endereço para entregas" />
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="info">
        <profile-form />
      </q-tab-panel>

      <q-tab-panel name="address"> </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import ProfileForm from "../forms/ProfileForm.vue";

export default {
  components: {
    ProfileForm
  },
  data: () => ({
    tab: "info"
  })
};
</script>
