<template>
  <b-container fluid class="m-auto">
    <div class="m-product-card m-auto">
      <span class="m-product-card__head">
        <div class="m-product-card__head-wrapper">
          <h2 class="m-product-card__head-brand">{{ cardData.brand }}</h2>
          <h2 class="m-product-card__head-name">{{ cardData.name }}</h2>
        </div>
      </span>
      <div class="m-product-card__body">
        <div class="m-product-card__body-wrapper">
          <img
            src="../static/norco_aurum_c72_2016_1.jpg"
            class="m-product-card__body-image"
          />
          <div class="m-product-card__body-description">
            <b-list-group>
              <b-list-group-item
                class="m-product-card__body-list"
                v-for="(item, i) of getProperties"
                :key="i"
              >
                <div class="m-product-card__body-list-item">
                  {{ item.name }}{{ `:` }}
                </div>

                <div>{{ item.value }}</div></b-list-group-item
              >
            </b-list-group>
            <b-dropdown
              id="dropdown-color"
              text="выбор цвета"
              size="lg"
              class="w-100 my-3"
            >
              <b-dropdown-item
                v-for="(item, i) of getParametersColor"
                :key="i"
                size="lg"
                >{{ item }}</b-dropdown-item
              >
            </b-dropdown>
            <div class="m-product-card__body-price">
              Цена {{ cardData.unitPrice }}
            </div>
            <b-button
              class="w-100 my-5"
              size="lg"
              variant="danger"
              @click="onBuy(cardData)"
              >Купить</b-button
            >
          </div>
        </div>
      </div>
    </div>
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
      const { card } = { test: "test" };
      const { colorSelected } = { color: "red" };

      this.$emit("add-to-order-form", ctx);
    },
  },
};
</script>

<style lang="scss" scoped>
.m-product-card {
  width: 100%;
  max-width: 800px;

  &__head {
    width: 100%;
    margin: 50px 0 20px 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    &-wrapper {
      display: flex;
      flex-direction: row;

      @media (max-width: 480px) {
        flex-direction: column;
      }
    }

    &-brand {
      margin: 0 10px 0 0;
    }
    &-name {
    font-weight: 700;
    }
  }

  &__body {
    width: 100%;

    &-description {
      width: 100%;

      @media (max-width: 480px) {
        max-width: 400px;
      }
    }

    &-wrapper {
      display: flex;
      justify-content: space-between;
      flex-direction: row;

      @media (max-width: 480px) {
        flex-direction: column;
        align-items: center;
      }
    }

    &-image {
      width: 100%;
      max-width: 400px;
      max-height: 230px;
      margin: 0 30px 0 0;
      object-fit: contain;
      border: 1px solid #d7d7d7;
      border-radius: 3px;

      @media (max-width: 480px) {
        margin: 0 auto;
      }
    }

    &-list {
      display: flex;
      justify-content: space-between;

      &-item {
        margin: 0 10px 0 0;
      }

      &-item:last-child {
        margin: 0;
      }
    }

    &-price:after {
      content: "\20BD";
    }
  }
}
</style>
