<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
    <div class="row">
      <div class="col">
        <q-input outlined v-model="text" label="E-mail*" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <q-input outlined v-model="text" label="Senha*" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <q-btn
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
export default {};
</script>
