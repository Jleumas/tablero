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
    <b-form-input v-model="itemName"></b-form-input>
    <p>Work Item Description</p>
    <b-form-input v-model="itemDescription"></b-form-input>
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
    };
  },
  methods: {
    ...mapActions(["editItem", "selectedItemBinding"]),
    onDrop(event) {
      event.preventDefault();
      this.selectedItem.filepath = event.dataTransfer.files[0].path;
    }
  },
  computed: {
    ...mapState(["editWorkItemModal", "selectedItem"]),
    itemName: {
      get() {
        return this.selectedItem.name;
      },
      set(value) {
        this.selectedItemBinding({ value: value, key: "name" });
      }
    },
    itemDescription: {
      get() {
        return this.selectedItem.description;
      },
      set(value) {
        this.selectedItemBinding({ value: value, key: "description" });
      }
    },
    itemFilepath: {
      get() {
        return this.selectedItem.filepath;
      },
      set(value) {
        this.selectedItemBinding({ value: value, key: "filepath" });
      }
    }
  }
};
</script>

<style scoped>
p {
  margin-top: 10px;
}
</style>