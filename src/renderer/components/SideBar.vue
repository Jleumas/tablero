<template>
  <div class="sidenav">
    <h4
      v-for="project in taskEntries.projects"
      :key="project.projectName"
      @click="setSelectedItemDetails(project)"
    >
      <span @click="setSelectedProject(project.name)">{{project.name}}</span>
      <b-icon-pencil-square @click="loadModal(project, editProjectModal)"></b-icon-pencil-square>
      <b-icon-trash @click="loadModal(project, deleteItemModal)"></b-icon-trash>
    </h4>
    <h4>
      <b-icon-plus-square @click="loadModal(blankObject, editProjectModal)"></b-icon-plus-square>
    </h4>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapGetters } = createNamespacedHelpers("Tasks");

export default {
  methods: {
    ...mapActions(["setSelectedProject", "setSelectedItemDetails"]),
    loadModal(item, modalID){
      this.setSelectedItemDetails(item);
      this.$bvModal.show(modalID);
    }
  },
  updated: function() {
    this.setSelectedProject(this.taskEntries.projects[0].name);
  },
  computed: {
    ...mapState([
      "taskEntries",
      "deleteItemModal",
      "editProjectModal", 
      "blankObject"
    ])
  }
};
</script>

<style scoped>
.sidenav {
  height: 100%;
  min-width: 350px;
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
  padding-top: 10px;
  padding-bottom: 10px;
  color: white;
}
</style>