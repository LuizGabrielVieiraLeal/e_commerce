<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
    <q-input
      outlined
      v-model="form.name"
      label="Nome *"
      lazy-rules
      required
      :rules="[
        val =>
          (val && val.length > 0) || 'O preenchimento deste campo é obrigatório'
      ]"
    />

    <q-input
      outlined
      label="Celular (Whatsapp)*"
      mask="(##) # #### - ####"
      unmasked-value
      v-model="form.phone"
      required
    />
    <div class="row justify-end q-mt-lg">
      <q-btn label="Salvar" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    form: {}
  }),
  computed: {
    ...mapGetters("user", ["currentUser"])
  },
  created: function() {
    this.form.name = this.currentUser.name;
    this.form.phone = this.currentUser.phone;
  }
};
</script>
