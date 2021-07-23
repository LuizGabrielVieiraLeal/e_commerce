<template>
  <q-layout>
    <q-toolbar class="text-primary q-py-sm shadow-2">
      <q-img
        :src="require('../assets/app-logo.png')"
        width="80px"
        height="50px"
      />
      <q-toolbar-title class="text-weight-bold"> Comilão </q-toolbar-title>
      <q-space />
      <q-btn
        class="q-mr-md"
        color="primary"
        outline
        label="Criar conta"
        @click="toggleDialog('signup')"
      />
      <q-btn color="primary" label="Entrar" @click="toggleDialog('signin')" />
    </q-toolbar>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog v-model="dialog" seamless position="right">
      <q-card style="width: 350px">
        <q-card-section>
          <div class="row">
            <div class="col">
              <q-tabs v-model="tab" no-caps class="text-primary">
                <q-tab name="signin" label="Entrar" />
                <q-tab name="signup" label="Criar conta" />
              </q-tabs>
              <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="signin">
                  <signin-form></signin-form>
                </q-tab-panel>

                <q-tab-panel name="signup">
                  <signup-form></signup-form>
                </q-tab-panel>
              </q-tab-panels>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import SigninForm from "../components/site/forms/SigninFom.vue";
import SignupForm from "../components/site/forms/SignupForm.vue";

export default {
  components: {
    SigninForm,
    SignupForm,
  },
  data: () => ({
    dialog: false,
    tab: "",
  }),
  methods: {
    toggleDialog(action = "") {
      if (this.tab === "") {
        this.tab = action;
        this.dialog = !this.dialog;
      } else if (action !== "" && action === this.tab) {
        this.dialog = !this.dialog;
        this.tab = "";
      } else {
        this.tab = action;
      }
    },
  },
};
</script>
