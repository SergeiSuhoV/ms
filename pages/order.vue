<template>
  <b-container fluid>
    <div class="order">
      <m-order-form
        :dataForm="dataForm"
        @submiting-data="submitData"
      ></m-order-form>
    </div>
    <m-popup :isOpen="isPopupOpened" @onClose="closePopup">
      <!-- содержание попапа -->
      <m-dialog-status
      :isStatus="true"
      ></m-dialog-status>
    </m-popup>
  </b-container>
</template>

<script>
import MDialogStatus from '../components/MDialogStatus.vue';
import MOrderForm from "../components/MOrderForm.vue";
import MPopup from "../components/MPopup.vue";

export default {
  components: { MOrderForm, MPopup, MDialogStatus },

  data() {
    return {
      // popup
      isPopupOpened: false,
    };
  },

  computed: {
    dataForm() {
      return this.$store.state.cardSelected.cardSelected;
    },
  },
  methods: {
    submitData(data) {
      console.log(data);
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

<style lang="scss">
.order {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
