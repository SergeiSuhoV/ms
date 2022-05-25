<template>
  <div>
    <m-product-card
      :cardData="dt"
      @add-to-order-form="openOrderForm"
    ></m-product-card>
    <button @click="openPopup">open popup</button>
    <m-popup :isOpen="isPopupOpened" @onClose="closePopup">
      <!-- содержание попапа -->
      <m-order-form :dataForm="dataForm"></m-order-form>
      <div>form</div>
    </m-popup>
  </div>
</template>

<script>
import MProductCard from "../components/MProductCard.vue";
import MPopup from "../components/MPopup.vue";
import MOrderForm from "../components/MOrderForm.vue";

export default {
  components: { MProductCard, MPopup, MOrderForm },
  name: "IndexPage",

  data() {
    return {
      // mocks
      dt: {
        unitCode: "150895",
        unitPrice: "245300.00",
        name: "AURUM C7.2",
        brand: "Norco",
        properties: [
          {
            name: "Модельный год",
            value: "2016",
          },
          {
            name: "Возраст",
            value: "Для взрослых",
          },
          {
            name: "Пол",
            value: "Унисекс",
          },
          {
            name: "Рама",
            value:
              "Карбон 650B, 4-рычажная система подвески A.R.T, ход - 200 мм. Дропауты заднего колеса стандарта Syntace X12, 142х12 мм. Крепления заднего тормоза стандарта Postmount.",
          },
          {
            name: "Задний амортизатор",
            value:
              "Rock Shox Vivid R2C, регулировка отскока в начале хода и в конце хода, регулировка низкоскоростной компрессии",
          },
          {
            name: "Вилка",
            value:
              "Rock shox Boxxer R2C2, 650B 200 мм, регулировка высоко и низкоскоростной компрессии, регулировка отскока в начале и конце хода",
          },
          {
            name: "Рулевая колонка",
            value: "Cane Creek 40",
          },
        ],
        parameters: [
          { name: "ФИО", necessary: 1, code: "name" },
          { name: "Email", necessary: 1, code: "email" },
          { name: "Адрес", code: "address" },
          {
            name: "Интервал доставки",
            code: "delivery",
            value: ["Утро", "День", "Вечер"],
          },
          {
            name: "Цвет",
            code: "color",
            value: ["Красный", "Синий", "Чёрный", "Белый"],
          },
          { name: "Количество", code: "count", value: 1 },
        ],
      },
      // popup
      isPopupOpened: false,
      dataForm: [],
    };
  },

  methods: {
    openOrderForm(data) {
      this.dataForm = data;
      this.openPopup();
    },
    openPopup() {
      this.isPopupOpened = true;
    },
    closePopup() {
      this.isPopupOpened = false;
    },
  },
};
</script>
