<template>
  <b-container fluid class="m-auto">
    <template v-if="cardData">
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
                :text="colorSelected"
                size="lg"
                class="w-100 my-3"
              >
              <!-- //TODO: немного получилось хардкорно с явным указанием элемента массива, какие варианты? -->
                <b-dropdown-item
                  v-for="(item, i) of getParametersColor[0].value"
                  :key="i"
                  size="lg"
                  @click="onChangeColor(item)"
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
                @click="onBuy({...cardData, colorSelected: colorSelected})"
                >Купить</b-button
              >
            </div>
          </div>
        </div>
      </div>
    </template>
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
  data() {
    return {
      colorSelected: "Выбор цвета",
    };
  },
  computed: {
    getProperties() {
      return this.cardData.properties;
    },
    getParametersColor() {      
      const colors = this.cardData.parameters.filter(
        (el) => el.code === "color"
      );

      return colors;
    },
    getTextColor() {
      return this.colorSelected;
    },
  },

  methods: {
    onChangeColor(color) {
      this.colorSelected = color;
    },
    onBuy(selected) {
      this.$emit("add-to-order-form", selected);
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
