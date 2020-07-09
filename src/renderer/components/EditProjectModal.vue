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
    <b-form-input :value="selectedItem.name"></b-form-input>
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
        id: this.selectedItem.id,
        name: this.selectedItem.name,
        type: 'project',
        color: '',
        filepath: '',
        description: ''
      })
    }
  },
  computed: {
    ...mapState(["editProjectModal", "selectedItem"]),
  }
};
</script>

<style scoped>
</style>