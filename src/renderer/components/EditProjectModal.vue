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
    <b-form-input placeholder="Project Title"></b-form-input>
    
  </b-modal>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapGetters } = createNamespacedHelpers('Tasks');

export default {
  name: "EditProjectModal",
  data() {
    return {

    };
  },
  computed: {
    ...mapState(['editProjectModal'])
  }
};
</script>

<style scoped>
</style>