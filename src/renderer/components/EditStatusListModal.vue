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
    <b-form-input :value="selectedItem.name"></b-form-input>
    <template v-slot:modal-footer="{ ok, cancel }">
      <b-button @click="ok(); editItem(selectedItem)">OK</b-button>
      <b-button @click="cancel()">Cancel</b-button>
    </template>
  </b-modal>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapGetters } = createNamespacedHelpers("Tasks");

export default {
  name: "EditStatusListModal",
  data() {
    return {};
  },
  methods: {
    ...mapActions(["editItem"])
  },
  computed: {
    ...mapState(["editStatusListModal", "selectedItem"])
  }
};
</script>

<style scoped>
</style>