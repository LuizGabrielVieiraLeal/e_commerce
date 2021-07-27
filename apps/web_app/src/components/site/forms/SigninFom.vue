<template>
  <q-form @submit="onSubmit" class="q-gutter-md">
    <div class="row">
      <div class="col">
        <q-input outlined label="E-mail*" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <q-input outlined label="Senha*" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <q-btn
          :loading="loading"
          class="full-width"
          label="Entrar"
          type="submit"
          color="primary"
        />
      </div>
    </div>
  </q-form>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    onSubmit() {
      this.loading = true;

      setTimeout(() => {
        this.$router.push("/user/");
      }, 2000);
    }
  }
};
</script>
