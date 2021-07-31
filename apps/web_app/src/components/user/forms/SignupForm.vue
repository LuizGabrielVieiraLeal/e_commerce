<template>
  <q-form @submit="onSubmit" class="q-gutter-md">
    <div class="row">
      <div class="col">
        <q-input
          type="text"
          outlined
          label="Nome*"
          v-model="newUser.name"
          required
        />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <q-input
          type="email"
          outlined
          label="E-mail*"
          v-model="newUser.email"
          required
        />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <q-input
          outlined
          label="Celular (Whatsapp)*"
          mask="(##) # #### - ####"
          v-model="newUser.phone"
          required
        />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <q-input
          type="password"
          outlined
          label="Senha*"
          v-model="newUser.password"
          required
        />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <q-input
          type="password"
          outlined
          label="Confirme sua senha*"
          v-model="passwordConfirmation"
          required
          :rules="[
            val =>
              val === newUser.password || 'A senhas digitadas não correspondem.'
          ]"
        />
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
import gql from "graphql-tag";
import { mapActions } from "vuex";

export default {
  data: () => ({
    loading: false,
    newUser: {
      name: "",
      email: "",
      phone: "",
      password: ""
    },
    passwordConfirmation: ""
  }),
  methods: {
    onSubmit() {
      this.loading = true;

      this.$apollo
        .mutate({
          mutation: gql`
            mutation($data: UserSignUpInput!) {
              signup(data: $data) {
                token
                user {
                  _id
                  name
                  email
                  phone
                  role
                }
              }
            }
          `,
          variables: {
            data: this.newUser
          }
        })
        .then(response => {
          console.log(response);
          let data = response.data.signup;

          this.authenticate(data);

          if (data.user.role === "USER") this.$router.push("/user");
        })
        .catch(error => {
          console.log(error);
        });

      this.loading = false;
    },

    ...mapActions("user", ["authenticate"])
  }
};
</script>
