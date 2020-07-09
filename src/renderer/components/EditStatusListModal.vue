<template>
  <b-modal
    :id="editStatusListModal"
    header-bg-variant="dark"
    header-text-variant="light"
    body-bg-variant="dark"
    body-text-variant="light"
    footer-bg-variant="dark"
    footer-text-variant="light"
    centered
    title="Edit Status List"
  >
    <p>Status List Title</p>
    <b-form-input></b-form-input>
    <template v-slot:modal-footer="{ ok, cancel }">
      <b-button @click="ok(); callEditItem()">OK</b-button>
      <b-button @click="cancel()">Cancel</b-button>
    </template>
    
  </b-modal>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapGetters } = createNamespacedHelpers('Tasks');

export default {
  name: "EditStatusListModal",
  data() {
    return {

    };
  },
  computed: {
    ...mapState(['editStatusListModal'])
  }
};
</script>

<style scoped>
</style>