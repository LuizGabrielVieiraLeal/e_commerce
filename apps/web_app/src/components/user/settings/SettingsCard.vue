<template>
  <q-card style="min-width: 350px">
    <q-card-section>
      <settings-tabs />
    </q-card-section>
  </q-card>
</template>

<script>
import SettingsTabs from "./SettingsTabs.vue";

export default {
  components: {
    SettingsTabs
  }
};
</script>
