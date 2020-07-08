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
    <b-form-input placeholder="Status List"></b-form-input>
    <p>Work Item Description</p>
    <b-form-input placeholder="Status List"></b-form-input>
    
  </b-modal>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapGetters } = createNamespacedHelpers('Tasks');

export default {
  name: "EditWorkItemModal",
  data() {
    return {

    };
  },
  computed: {
    ...mapState(['editWorkItemModal'])
  }
};
</script>

<style scoped>
</style>