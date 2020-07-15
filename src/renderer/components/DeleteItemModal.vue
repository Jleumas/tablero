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
    <p>Are you sure you want to delete {{selectedItem.name}}?</p>
    <template v-slot:modal-footer="{ ok, cancel }">
      <b-button @click="ok(); deleteItem(selectedItem)">OK</b-button>
      <b-button @click="cancel()">Cancel</b-button>
    </template>
  </b-modal>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("Tasks");

export default {
  name: "DeleteItemModal",
  data() {
    return {};
  },
  methods: {
    ...mapActions(["deleteItem"]),
  },
  computed: {
    ...mapState(["deleteItemModal", "selectedItem"])
  }
};
</script>

<style scoped>
</style>