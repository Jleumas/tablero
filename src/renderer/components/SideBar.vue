<template>
  <div class="sidenav">
    <h4 v-for="project in taskEntries.projects" :key="project.projectName">
      <span @click="setSelectedProject(project.projectName)">{{project.projectName}}</span>
      <b-icon-pencil-square @click="showModal(editProjectModal)"></b-icon-pencil-square>
      <b-icon-trash @click="showModal(deleteItemModal)"></b-icon-trash>
    </h4>
    <h4><b-icon-plus-square @click="showModal(editProjectModal)"></b-icon-plus-square></h4>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapGetters } = createNamespacedHelpers("Tasks");

export default {
  methods: {
    ...mapActions(["setSelectedProject"]),
    showModal(modalID) {
      this.$bvModal.show(modalID);
    }
  },
  mounted: function() {
    this.setSelectedProject(this.taskEntries.projects[0].projectName);
  },
  computed: {
    ...mapState([
      "taskEntries",
      "selectedProjectName",
      "deleteItemModal",
      "editProjectModal"
    ])
  }
};
</script>

<style scoped>
.sidenav {
  height: 100%;
  min-width: 250px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  padding-top: 20px;
  margin-right: 20px;
  border-right: 1px solid black;
}
.sidenav div {
  display: flex;
  justify-content: space-around;
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 25px;
  color: rgb(235, 235, 235);
  display: block;
}
.sidenav div:hover {
  color: white;
}
</style>