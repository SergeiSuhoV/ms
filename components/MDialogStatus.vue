<template>
  <span class="m-dialog-status">
    <div v-if="isStatus" class="m-dialog-status_accept">Ваша заявка ОКЕЙ</div>
    <div v-else class="m-dialog-status_error">Ошибка оформления заявки!</div>
  </span>
</template>

<script>
export default {
  props: {
    isStatus: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.m-dialog-status {
  width: 100%;
  max-width: 300px;
  height: 200px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;

  &_accept {
    color: green;
  }
  &_error {
    color: red;
  }
}
</style>
