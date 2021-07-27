<template>
  <q-layout>
    <q-header elevated class="bg-white text-primary">
      <q-toolbar class="q-py-sm">
        <q-img
          :src="require('../assets/app-logo.png')"
          width="100px"
          height="50px"
        />
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
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <div class="row bg-grey-1 q-pa-xl">
      <div class="col-xs-12 col-md-7 text-weight-medium">
        <h5>Fale conosco!</h5>
        <p>Endereço: Avenida Roberto Silveira, 15, Itaocara - RJ</p>
        <p>CEP: 28570-000</p>
        <p>Telefone / Whatsapp: (22) 9 9999-9999</p>
        <p>Email: sac@comilão.com.br</p>
      </div>
      <div class="col-xs-12 col-md-5">
        <div class="mapouter">
          <div class="gmap_canvas">
            <iframe
              width="600"
              height="300"
              id="gmap_canvas"
              src="https://maps.google.com/maps?q=Avenida%20Roberto%20Silveira,%2015,%20Itaocara&t=&z=13&ie=UTF8&iwloc=&output=embed"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>

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
    SignupForm
  },
  data: () => ({
    dialog: false,
    tab: ""
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
    }
  }
};
</script>

<style lang="css" scoped>
.mapouter {
  position: relative;
  text-align: right;
  height: 300px;
  width: 100%;
}
.gmap_canvas {
  overflow: hidden;
  background: none !important;
  height: 300px;
  width: 100%;
}
</style>
