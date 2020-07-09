<template>
  <b-modal
    :id="editProjectModal"
    header-bg-variant="dark"
    header-text-variant="light"
    body-bg-variant="dark"
    body-text-variant="light"
    footer-bg-variant="dark"
    footer-text-variant="light"
    centered
    title="Edit Project"
  >
    <p>Project Title</p>
    <b-form-input :value="selectedItemName"></b-form-input>
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
  name: "EditProjectModal",
  data() {
    return {};
  },
  methods: {
    ...mapActions(["editItem"]),
    callEditItem(){
      this.editItem({
        id: this.selectedItemID,
        name: this.selectedItemName,
        type: 'project',
        color: '',
        filepath: '',
        description: ''
      })
    }
  },
  computed: {
    ...mapState(["editProjectModal", "selectedItemName", "selectedItemID", "selectedItemType"]),
  }
};
</script>

<style scoped>
</style>