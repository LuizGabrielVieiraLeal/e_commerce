<template>
  <q-form class="q-gutter-md">
    <div class="row">
      <div class="col">
        <q-input outlined label="Nome*" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <q-input outlined label="E-mail*" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <q-input
          outlined
          label="Celular (Whatsapp)*"
          mask="(##) # #### - ####"
        />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <q-input outlined label="Senha*" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <q-input outlined label="Confirme sua senha*" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <q-btn
          class="full-width"
          label="Criar conta"
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
