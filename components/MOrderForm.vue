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

      <template v-for="itemField of dataForm.parameters">
        <b-form-group :key="itemField.name" :label="itemField.name">
          <b-form-input></b-form-input>
        </b-form-group>
      </template>
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
.m-order-form__input_error {
}
</style>
