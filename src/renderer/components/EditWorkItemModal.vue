<template>
  <b-modal
    :id="editWorkItemModal"
    header-bg-variant="dark"
    header-text-variant="light"
    body-bg-variant="dark"
    body-text-variant="light"
    footer-bg-variant="dark"
    footer-text-variant="light"
    centered
    title="Edit Work Item"
  >
    <p>Work Item Title</p>
    <b-form-input :value="selectedItemName"></b-form-input>
    <p>Work Item Description</p>
    <b-form-input :value="selectedItemDescription"></b-form-input>
    <p>Associated File</p>
    <input id="file-selector" type="file" @drop="onDrop" />
    <p>{{selectedItemFilepath}}</p>

    <template v-slot:modal-footer="{ ok, cancel }">
      <b-button @click="ok(); callEditItem()">OK</b-button>
      <b-button @click="cancel()">Cancel</b-button>
    </template>

  </b-modal>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapGetters } = createNamespacedHelpers("Tasks");

export default {
  name: "EditWorkItemModal",
  data() {
    return {
      filename: ''
    };
  },
  methods: {
    onDrop(event) {
      event.preventDefault();
      document.getElementById("file-selector").innerText =
        event.dataTransfer.files[0].path;
      this.filename = event.dataTransfer.files[0].path;
    },
  },
  computed: {
    ...mapState([
      "editWorkItemModal",   
      "selectedItemName",
      "selectedItemID",
      "selectedItemType",
      "selectedItemDescription",
      "selectedItemFilepath"
      ])
  }
};
</script>

<style scoped>
p {
  margin-top: 10px;
}
</style>