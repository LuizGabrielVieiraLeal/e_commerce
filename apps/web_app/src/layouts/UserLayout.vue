<template>
  <q-layout>
    <q-header elevated class="bg-white text-primary">
      <q-toolbar class="q-pa-sm">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="drawer = !drawer"
        />
        <q-img
          class="q-ml-md"
          :src="require('../assets/app-logo.png')"
          width="100px"
          height="50px"
        />
        <q-space />
        <q-btn class="q-mr-md" round color="primary" icon="account_circle">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section>Configurações</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup @click="logout">
                <q-item-section>Sair</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above bordered>
      <q-scroll-area class="fit">
        <q-list class="q-pa-md">
          <template v-for="(menuItem, index) in menuList">
            <q-item :key="index" clickable v-ripple :to="menuItem.path">
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
              <q-item-section side>
                <q-badge
                  v-if="totalItems > 0 && menuItem.label === 'Sacola'"
                  class="q-mt-md q-mr-lg"
                  style="margin-top:21px;"
                  color="green"
                  floating
                  >{{ totalItems }}</q-badge
                >
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="q-pa-lg">
      <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        appear
        :duration="300"
      >
        <router-view />
      </transition>
    </q-page-container>

    <q-dialog v-model="cartDialog" position="bottom" seamless>
      <q-card style="width: 265px">
        <q-card-section>
          <div class="row">
            <div class="col-xs-3">
              <div class="row justify-center">
                <q-btn
                  class="q-mr-md"
                  round
                  color="primary"
                  icon="shopping_basket"
                  to="/user/cart"
                >
                  <q-badge v-if="totalItems > 0" color="green" floating>{{
                    totalItems
                  }}</q-badge>
                </q-btn>
              </div>
            </div>
            <div class="col-xs-9 q-px-lg">
              <div class="text-weight-bold">
                R$
                {{
                  totalPrice
                    .toFixed(2)
                    .toString()
                    .replace(".", ",")
                }}
              </div>
              <div class="text-grey">{{ totalItems }} itens na sacola</div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

const menuList = [
  {
    icon: "home",
    label: "Início",
    separator: false,
    path: "/user/home"
  },
  {
    icon: "shopping_basket",
    label: "Sacola",
    separator: false,
    path: "/user/cart"
  },
  {
    icon: "list_alt",
    label: "Pedidos",
    separator: false,
    path: "/user/orders"
  }
];

export default {
  data: () => ({
    drawer: true,
    menuList
  }),
  computed: {
    cartDialog: {
      get: function() {
        return this.totalItems > 0;
      }
    },
    ...mapGetters("user", ["currentUser"]),
    ...mapGetters("cart", ["totalItems", "totalPrice"])
  },
  methods: {
    logout() {
      this.signout();
      this.$router.push("/");
    },

    ...mapActions("user", ["signout"])
  }
};
</script>
