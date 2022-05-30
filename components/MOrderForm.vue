<template>
  <div class="m-order-form">
    <h2>Форма заказа</h2>
    <b-list-group class="mt-3 mb-5">
      <b-list-group-item>Код товара: {{ dataForm.unitCode }}</b-list-group-item>
      <b-list-group-item>Бренд: {{ dataForm.brand }}</b-list-group-item>
      <b-list-group-item>Наименование: {{ dataForm.name }}</b-list-group-item>
      <b-list-group-item
        >Цена за 1шт: {{ dataForm.unitPrice }}</b-list-group-item
      >
    </b-list-group>
    <b-form @submit.stop.prevent="onSubmit" id="form-submit">
      <!-- Поле ФИО -->
      <div role="name">
        <label for="input-fields-fullName" class="my-2"
          >Ваше имя полностью:</label
        >
        <b-form-input
          id="input-fields-fullName"
          v-model="fields.fullName"
          :state="fullNameState"
          placeholder="например: Иванов Петр Семенович"
          aria-describedby="input-fields-fullName-feedback"
          class="mb-2"
        ></b-form-input>
        <!-- информер если не прошли валидацию -->
        <b-form-invalid-feedback
          id="input-fields-fullName-feedback"
          class="mb-3"
        >
          Ошибка: не менее двух слов (не менее 2-х символов каждое), разрешается
          использовать русские и латинские буквы, пробел и дефис.
        </b-form-invalid-feedback>
      </div>
      <!-- Поле почта -->
      <div role="email">
        <label for="input-fields-email">Email:</label>
        <b-form-input
          id="input-fields-email"
          v-model="fields.email"
          :state="emailState"
          placeholder="например: name@email.ru"
          aria-describedby="input-fields-email-feedback"
          class="mb-2"
        ></b-form-input>
        <!-- информер если не прошли валидацию -->
        <b-form-invalid-feedback id="input-fields-email-feedback" class="mb-3">
          Ошибка: Введите корректный email
        </b-form-invalid-feedback>
      </div>
      <!-- Поле адрес -->
      <div role="address">
        <label for="input-fields-address" class="mb-1">Адрес:</label>
        <b-form-input
          v-model="fields.address"
          :state="addressState"
          class="mb-3"
        ></b-form-input>
      </div>
      <!-- Поле интервал доставки -->
      <div role="delivery">
        <label for="input-fields-delivery" class="mb-1"
          >Интервал доставки:</label
        >
        <b-form-select
          v-model="dataDeliverySelected.selected"
          :options="dataDeliverySelected.options"
          size="sm"
          class="mt-3"
        ></b-form-select>
      </div>
      <!-- Поле выбранный цвет -->
      <div role="color-selected">
        <label for="input-fields-select" class="mb-1">Выбранный цвет:</label>
        <b-form-select
          v-model="dataColorSelected.selected"
          :options="dataColorSelected.options"
          size="sm"
          class="mt-3"
        ></b-form-select>
      </div>

      <!-- Слайдер -->
      <div role="select-total">
        <label for="slider-total">Количество: {{ fields.totalCount }}</label>
        <vue-slider
          :clickable="false"
          v-model="fields.totalCount"
          :min="sliderOptions.min"
          :max="sliderOptions.max"
          class="mb-4"
        ></vue-slider>
      </div>
      <!-- отправка формы -->
      <!-- TODO: Отключить кнопку, если валидация не проходит -->
      <b-button
        type="submit"
        variant="primary"
        :disabled="!fullNameState || !emailState || !addressState"
        >Оформить</b-button
      >
    </b-form>
  </div>
</template>

<script>
// слайдер
import VueSlider from "vue-slider-component/dist-css/vue-slider-component.umd.min.js";
import "vue-slider-component/dist-css/vue-slider-component.css";
// import theme
import "vue-slider-component/theme/default.css";

export default {
  components: {
    VueSlider,
  },
  props: {
    dataForm: {
      type: [Object, Array],
      default: null,
    },
  },
  data() {
    return {
      fields: {
        email: "",
        fullName: "",
        address: "",
        totalCount: 1,
      },
      dataColorSelected: {
        selected: null,
        options: [],
      },
      dataDeliverySelected: {
        selected: null,
        options: [],
      },
      submitValid: true,
      // slider data
      sliderOptions: {
        min: 0,
        max: 10,
      },
    };
  },

  mounted() {
    // Получим периоды доставки
    const deliveryPeriods = this.dataForm.parameters
      .filter((delivery) => delivery.code === "delivery")
      .map((el) => {
        return {
          value: el,
          text: el,
        };
      });

    // Значению для полей доставки и выбранного цвета
    this.dataColorSelected.options = [
      {
        value: null,
        text: this.dataForm.colorSelected,
      },
    ]; //TODO: немного получилось хардкорно с явным указанием элемента массива, какие варианты?
    this.dataDeliverySelected.options = [
      this.dataForm.parameters
        .filter((del) => del.code === "delivery")[0]
        .value.map((el) => {
          return {
            value: el,
            text: el,
          };
        }),
    ];
  },

  methods: {
    isEmpty(str) {
      return str.trim() === "";
    },

    resetForm() {
      this.fields.email = "";
      this.fields.fullName = "";
      this.fields.address = "";
      this.fields.totalCount = "";
    },

    onSubmit() {
      this.$emit("submiting-data", {
        ...this.fields,
        colorSelected: this.dataForm.colorSelected,
        // ...this.dataDeliverySelected.selected,
      });
      this.resetForm();
    },
  },

  computed: {
    fullNameState() {
      // TODO: Составить регулярку по ТЗ(текущая взята с сети)
      const reg = /^(?=.{1,40}$)[а-яёА-ЯЁ]+(?:[-' ][а-яёА-ЯЁ]+)*$/;

      return reg.test(this.fields.fullName);
    },

    emailState() {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(this.fields.email);
    },

    addressState() {
      return !this.isEmpty(this.fields.address);
    },

    deliveriState() {
      return !this.isEmpty(this.fields.delivery);
    },
    colorSelectedState() {
      return this.dataForm.colorSelected !== null
        ? this.dataColorSelect.colorSelected
        : false;
    },
  },
};
</script>

<style scoped>
.m-order-form {
  max-width: 520px;
  width: 100%;
  padding: 30px;
  margin: 50px 0;
  border-radius: 3px;
  background-color: #ffffff;
}
</style>
