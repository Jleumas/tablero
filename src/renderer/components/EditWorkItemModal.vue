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
    <b-form-input :value="selectedItem.name"></b-form-input>
    <p>Work Item Description</p>
    <b-form-input :value="selectedItem.description"></b-form-input>
    <p>Associated File</p>
    <input id="file-selector" type="file" @drop="onDrop" />
    <p>{{selectedItem.filepath}}</p>

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
  name: "EditWorkItemModal",
  data() {
    return {
      filename: ''
    };
  },
  methods: {
    ...mapActions(["editItem"]),
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
      "selectedItem"
      ])
  }
};
</script>

<style scoped>
p {
  margin-top: 10px;
}
</style>