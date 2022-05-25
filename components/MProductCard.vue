<template>
  <b-container>
    <b-card
      :title="cardData.name"
      img-src="../static/norco_aurum_c72_2016_1.jpg"
      tag="article"
    >
      <b-list-group>
        <b-list-group-item v-for="(item, i) of getProperties" :key="i"
          >{{ item.name }} -- {{ item.value }}</b-list-group-item
        >
      </b-list-group>
      <b-dropdown id="dropdown-color" text="выбор цвета" class="m-md-2">
        <b-dropdown-item v-for="(item, i) of getParametersColor" :key="i">{{
          item
        }}</b-dropdown-item>
      </b-dropdown>
      <b-button @click="onBuy(cardData)">Купить</b-button>
    </b-card>
  </b-container>
</template>

<script>
export default {
  props: {
    cardData: {
      type: Object,
      default: null,
    },
  },
  computed: {
    getProperties() {
      return this.cardData.properties;
    },
    getParametersColor() {
      //TODO: немного получилось хардкорно с явным указанием элемента массива, по хорошему как-то переделать нужно
      const colors = this.cardData.parameters.filter(
        (el) => el.code === "color"
      )[0].value;

      return colors;
    },
  },

  methods: {
    onBuy(ctx) {
      const {card} = {test: "test"}
      const {colorSelected} = {color: "red"}

      this.$emit("add-to-order-form", ctx);
    },
  },
};
</script>

<style></style>
