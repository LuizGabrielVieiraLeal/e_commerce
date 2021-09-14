<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">
        Pedido: <span class="text-primary">{{ order._id }}</span>
      </div>
    </q-card-section>
    <q-card-section
      v-if="order.status !== 'DELIVERED' && order.status !== 'CANCELLED'"
    >
      <div class="row">
        <div class="col-xs-12">
          <p class="text-bold">{{ statusLabel }}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-3 q-px-xs">
          <q-linear-progress
            :indeterminate="pending"
            :value="preparing || onTheWay ? 100 : 0"
            color="positive"
          />
        </div>
        <div class="col-xs-6 q-px-xs">
          <q-linear-progress
            :indeterminate="!pending && preparing"
            :value="onTheWay ? 100 : 0"
            color="positive"
          />
        </div>
        <div class="col-xs-3 q-px-xs">
          <q-linear-progress
            :indeterminate="!pending && !preparing && onTheWay"
            color="positive"
          />
        </div>
      </div>
    </q-card-section>
    <q-card-section class="q-pt-none q-mt-none">
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
        Total: R$
        {{
          order.total
            .toFixed(2)
            .toString()
            .replace(".", ",")
        }}
      </p>
      <q-separator class="q-my-md" />
      <p class="q-my-none q-mx-md">
        Método de pagamento:
        <span class="text-bold">{{ paymentMethodLabel }}</span>
      </p>
    </q-card-section>
    <q-card-actions>
      <q-badge
        v-if="order.status === 'DELIVERED' || order.status === 'CANCELLED'"
        class="q-mx-sm"
        outline
        color="primary"
        size="lg"
        :label="statusLabel"
      />
      <q-space />
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
  },
  computed: {
    paymentMethodLabel() {
      switch (this.order.paymentMethod) {
        case "CASH":
          return "Dinheiro";
        case "CARD_ON_DELIVERY":
          return "Maquininha";
        default:
          return "Método desconhecido";
      }
    },
    statusLabel() {
      switch (this.order.status) {
        case "PENDING":
          return "Aguardando aprovação do restaurante";
        case "ON_THE_WAY":
          return "Seu pedido está a caminho";
        case "DELIVERED":
          return "Entregue";
        case "CANCELLED":
          return "Cancelado";
        default:
          return "Seu pedido está sendo preparado";
      }
    },
    pending() {
      return this.order.status === "PENDING";
    },
    preparing() {
      return (
        this.order.status !== "PENDING" &&
        this.order.status !== "ON_THE_WAY" &&
        this.order.status !== "DELIVERED" &&
        this.order.status !== "CANCELLED"
      );
    },
    onTheWay() {
      return this.order.status === "ON_THE_WAY";
    }
  }
};
</script>
