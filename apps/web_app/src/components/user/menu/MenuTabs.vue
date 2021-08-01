<template>
  <div class="row">
    <div class="col-xs-12">
      <q-tabs
        v-model="tab"
        align="justify"
        no-caps
        outside-arrows
        mobile-arrows
        class="bg-white text-primary"
      >
        <template v-for="category in categories">
          <q-tab
            :key="category._id"
            :name="category._id"
            :label="category.name"
          />
        </template>
      </q-tabs>
      <q-tab-panels v-model="tab" animated>
        <template v-for="category in categories">
          <q-tab-panel :key="category.id" :name="category._id">
            <template v-for="product in products">
              <menu-item
                :key="product._id"
                v-if="product.category._id === category._id"
                :product="product"
              />
            </template>
          </q-tab-panel>
        </template>
      </q-tab-panels>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { mapActions } from "vuex";
import MenuItem from "./MenuItem.vue";

export default {
  components: {
    MenuItem
  },
  apollo: {
    categories: {
      query: gql`
        query {
          categories {
            _id
            name
          }
        }
      `,
      fetchPolicy: "cache-first",
      result({ data, loading, networkStatus }) {
        this.tab = data.categories[0]["_id"];
        this.storeCategories(data.categories);
      }
    },
    products: {
      query: gql`
        query {
          products(orderBy: [price_ASC, name_ASC]) {
            _id
            category {
              _id
              name
            }
            name
            description
            price
            unit
          }
        }
      `,
      fetchPolicy: "cache-first",
      result({ data, loading, networkStatus }) {
        this.storeProducts(data.products);
      }
    }
  },
  data: () => ({
    tab: "",
    categories: []
  }),
  methods: {
    ...mapActions("categories", ["storeCategories"]),
    ...mapActions("products", ["storeProducts"])
  }
};
</script>
