<template>
  <q-form @submit="onSubmit" class="q-gutter-md">
    <div class="row">
      <div class="col">
        <q-input
          outlined
          type="email"
          label="E-mail*"
          v-model="credentials.email"
          required
        />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <q-input
          outlined
          type="password"
          label="Senha*"
          v-model="credentials.password"
          required
        />
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
import gql from "graphql-tag";
import { mapActions } from "vuex";

export default {
  data: () => ({
    loading: false,
    credentials: {
      email: "",
      password: ""
    }
  }),
  methods: {
    onSubmit() {
      this.loading = true;

      this.$apollo
        .mutate({
          mutation: gql`
            mutation($data: UserSignInInput!) {
              signin(data: $data) {
                token
                user {
                  _id
                  address {
                    _id
                    street
                    number
                    district
                    complement
                    city
                    state
                    country
                    zipCode
                  }
                  name
                  email
                  phone
                  role
                }
              }
            }
          `,
          variables: {
            data: this.credentials
          }
        })
        .then(response => {
          let data = response.data.signin;

          this.authenticate(data);

          if (data.user.role === "USER") this.$router.push("/user/home");
        })
        .catch(error => {
          console.log(error);
          this.$q.notify(
            "E-mail e/ou senha inválidos. Por favor verifique se os campos estão preenchidos corretamente e tente novamente."
          );
        });

      this.loading = false;
    },

    ...mapActions("user", ["authenticate"])
  }
};
</script>
