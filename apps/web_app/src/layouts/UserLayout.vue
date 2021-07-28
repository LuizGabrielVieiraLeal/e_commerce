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
        <q-btn class="q-mr-md" round color="primary" icon="shopping_basket">
          <q-badge color="green" floating>2</q-badge>
        </q-btn>
        <q-btn class="q-mr-md" round color="primary" icon="account_circle" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above bordered>
      <q-scroll-area class="fit">
        <q-list class="q-pa-md">
          <template v-for="(menuItem, index) in menuList">
            <q-item
              :key="index"
              clickable
              :active="menuItem.label === 'Início'"
              v-ripple
            >
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="q-pa-lg">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
const menuList = [
  {
    icon: "home",
    label: "Início",
    separator: false
  },
  {
    icon: "shopping_basket",
    label: "Sacola",
    separator: false
  },
  {
    icon: "list_alt",
    label: "Pedidos",
    separator: false
  },
  {
    icon: "exit_to_app",
    label: "Sair",
    separator: false
  }
];

export default {
  data: () => ({
    drawer: true,
    menuList
  })
};
</script>
