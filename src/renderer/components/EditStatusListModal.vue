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
    <b-form-input v-model="itemName"></b-form-input>
    <template v-slot:modal-footer="{ ok, cancel }">
      <b-button @click="ok(); callCreateItem(selectedItem);">OK</b-button>
      <b-button @click="cancel()">Cancel</b-button>
    </template>
  </b-modal>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("Tasks");

export default {
  name: "EditStatusListModal",
  data() {
    return {};
  },
  methods: {
    ...mapActions(["createItem", "selectedItemBinding"]),
    callCreateItem(newItem) {
      newItem.type = "statusList";
      newItem.parentItemID = this.selectedProjectID;
      this.createItem(newItem);
    }
  },
  computed: {
    ...mapState(["editStatusListModal", "selectedItem", "selectedProjectID"]),
    itemName: {
      get() {
        return this.selectedItem.name;
      },
      set(value) {
        this.selectedItemBinding({ value: value, key: "name" });
      }
    }
  }
};
</script>

<style scoped>
</style>