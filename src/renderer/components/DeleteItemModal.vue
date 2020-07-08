<template>
  <b-modal
    :id="deleteItemModal"
    header-bg-variant="dark"
    header-text-variant="light"
    body-bg-variant="dark"
    body-text-variant="light"
    footer-bg-variant="dark"
    footer-text-variant="light"
    centered
    title="Delete Item"
  >
    <p>Project Title</p>
  </b-modal>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapGetters } = createNamespacedHelpers("Tasks");

export default {
  name: "DeleteItemModal",
  data() {
    return {};
  },
  computed: {
    ...mapState(["deleteItemModal"])
  }
};
</script>

<style scoped>
</style>