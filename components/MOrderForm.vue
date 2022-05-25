<template>
  <div class="m-order-form">
    <h2>Форма заказа</h2>
    <b-list-group>
      <b-list-group-item>Код товара: {{ dataForm.unitCode }}</b-list-group-item>
      <b-list-group-item>Бренд: {{ dataForm.brand }}</b-list-group-item>
      <b-list-group-item>Наименование: {{ dataForm.name }}</b-list-group-item>
      <b-list-group-item
        >Цена за 1шт: {{ dataForm.unitPrice }}</b-list-group-item
      >
    </b-list-group>
    <b-form @submit.stop.prevent="onSubmit" id="">
      <!-- Поле ФИО -->
      <div role="name">
        <label for="input-fields-fullName">Ваше имя полностью:</label>
        <b-form-input
          id="input-fields-fullName"
          v-model="fields.fullName"
          :state="fullNameState"
          placeholder="например: Иванов Петр Семенович"
          aria-describedby="input-fields-fullName-feedback"
        ></b-form-input>
        <!-- информер если не прошли валидацию -->
        <b-form-invalid-feedback id="input-fields-fullName-feedback">
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
        ></b-form-input>
        <!-- информер если не прошли валидацию -->
        <b-form-invalid-feedback id="input-fields-email-feedback">
          Ошибка: Введите корректный email
        </b-form-invalid-feedback>
      </div>
      <!-- Поле адрес -->
      <div role="address">
        <label for="input-fields-address">Адрес:</label>
        <b-form-input
          v-model="fields.address"
          :state="addressState"
        ></b-form-input>
      </div>
      <!-- Поле интервал доставки -->
      <div role="delivery">
        <label for="input-fields-delivery">Интервал доставки:</label>
        <b-form-input
          v-model="fields.delivery"
          :state="deliveriState"
        ></b-form-input>
      </div>
      <!-- Поле выбранный цвет -->
      <div role="color-selected">
        <label for="input-fields-select">Выбранный цвет:</label>
        <b-form-select
          v-model="dataColorSelect.selected"
          :options="dataColorSelect.options"
        ></b-form-select>
      </div>

      <!-- отправка формы -->
      <b-button type="submit" variant="primary">Оформить</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  props: {
    dataForm: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      errors: [],
      fields: {
        email: "",
        fullName: "",
        address: "",
        delivery: "",
        colorSelected: "",
        totalCount: "",
      },
      dataColorSelect: {
        selected: { value: null, text: "Пожалуйста, выберите опцию" },
        options: [
          // { value: null, text: "Пожалуйста, выберите опцию" },
          { value: "Красный", text: "Красный" },
        ],
      },
    };
  },
  methods: {
    isEmpty(str) {
      return str.trim() === "";
    },
  },
  computed: {
    fullNameState() {
      // TODO: Составить регулярку по ТЗ
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
  },
};
</script>

<style scoped>
.m-order-form {
  max-width: 520px;
  width: 100%;
  padding: 30px;
  border: solid 1px #000000;
  border-radius: 3px;
  background-color: #ffffff;
}
</style>
