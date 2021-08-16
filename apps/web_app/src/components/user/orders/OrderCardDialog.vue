<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">
        Pedido: <span class="text-primary">{{ order._id }}</span>
      </div>
    </q-card-section>
    <q-card-section>
      <q-item-label header>
        Descrição do pedido
      </q-item-label>
      <template v-for="item in order.items">
        <p :key="item.product.name" class="q-my-none q-mx-md text-bold">
          {{
            `${item.quantity} ${item.product.name}: R$ ${item.total
              .toFixed(2)
              .toString()
              .replace(".", ",")}`
          }}
        </p>
      </template>
      <q-separator class="q-my-md" />
      <p class="q-my-none q-mx-md text-bold">
        Total:
        {{
          order.total
            .toFixed(2)
            .toString()
            .replace(".", ",")
        }}
      </p>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn flat label="Fechar" color="primary" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      required: true
    }
  }
};
</script>
