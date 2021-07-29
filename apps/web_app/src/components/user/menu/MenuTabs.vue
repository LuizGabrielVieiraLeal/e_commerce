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
import MenuItem from "./MenuItem.vue";

export default {
  components: {
    MenuItem
  },
  data: () => ({
    tab: null,
    categories: [
      { _id: "a1", name: "Lanches" },
      { _id: "a2", name: "Pizzas" },
      { _id: "a3", name: "Bebidas" }
    ],
    products: [
      {
        _id: "b1",
        category: {
          _id: "a1"
        },
        image:
          "https://offloadmedia.feverup.com/saopaulosecreto.com/wp-content/uploads/2020/10/27043606/pexels-valeria-boltneva-1639557-scaled.jpg",
        name: "X-Man",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id nisi laoreet, posuere elit vel, hendrerit purus. Donec eu ultricies augue. Fusce condimentum ultrices sem, vitae laoreet lectus tincidunt eu. Mauris fringilla commodo libero et tristique. Fusce mattis euismod neque, at consectetur erat laoreet at. Morbi venenatis orci vestibulum, dictum mauris id, pulvinar ante. ",
        unity: "UN",
        price: 10
      },
      {
        _id: "b2",
        category: {
          _id: "a1"
        },
        image:
          "https://media-cdn.tripadvisor.com/media/photo-s/1a/01/95/8d/ze-colmeia.jpg",
        name: "X-Mostro",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id nisi laoreet, posuere elit vel, hendrerit purus. Donec eu ultricies augue. Fusce condimentum ultrices sem, vitae laoreet lectus tincidunt eu. Mauris fringilla commodo libero et tristique. Fusce mattis euismod neque, at consectetur erat laoreet at. Morbi venenatis orci vestibulum, dictum mauris id, pulvinar ante. ",
        unity: "UN",
        price: 15
      },
      {
        _id: "b3",
        category: {
          _id: "a2"
        },
        image:
          "https://brcommartinlabsapptiteimagens.s3.amazonaws.com/chef/4488/rJ7ZUHpv8.jpg",
        name: "Pizza Portuguesa",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id nisi laoreet, posuere elit vel, hendrerit purus. Donec eu ultricies augue. Fusce condimentum ultrices sem, vitae laoreet lectus tincidunt eu. Mauris fringilla commodo libero et tristique. Fusce mattis euismod neque, at consectetur erat laoreet at. Morbi venenatis orci vestibulum, dictum mauris id, pulvinar ante. ",
        unity: "UN",
        price: 50
      },
      {
        _id: "b4",
        category: {
          _id: "a2"
        },
        image:
          "https://www.receiteria.com.br/wp-content/uploads/receitas-de-pizza-quatro-queijos-00.jpg",
        name: "Pizza Quatro Queijos",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id nisi laoreet, posuere elit vel, hendrerit purus. Donec eu ultricies augue. Fusce condimentum ultrices sem, vitae laoreet lectus tincidunt eu. Mauris fringilla commodo libero et tristique. Fusce mattis euismod neque, at consectetur erat laoreet at. Morbi venenatis orci vestibulum, dictum mauris id, pulvinar ante. ",
        unity: "UN",
        price: 50
      },
      {
        _id: "b5",
        category: {
          _id: "a3"
        },
        image:
          "https://a-static.mlcdn.com.br/618x463/cerveja-heineken-puro-malte-lager-premium-long-neck-6-garrafas-de-330ml/magazineluiza/225339400/38384e0e6dacd5b1818bff0ff973c0a0.jpg",
        name: "Cerveja Heineken (long neck)",
        description: null,
        unity: "UN",
        price: 8
      },
      {
        _id: "b6",
        category: {
          _id: "a3"
        },
        image:
          "data:image/jpeg;base64,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",
        name: "Coca-cola (lata)",
        description: null,
        unity: "UN",
        price: 4
      }
    ]
  }),
  created: function() {
    this.tab = this.categories[0]["_id"];
  }
};
</script>

<style lang="css">
.quantity-counter {
  font-size: 30px;
  font-weight: bolder;
}
</style>
