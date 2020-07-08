<template>
  <div class="main-page">
    <SideBar></SideBar>
    <h1 class="board-title" @click="showModal(editProjectModal)">{{selectedProjectName}}</h1>
    <h2>Current Item ID: {{selectedItemID}}</h2>
    <WorkItemBoard></WorkItemBoard>
    <EditWorkItemModal></EditWorkItemModal>
    <EditStatusListModal></EditStatusListModal>
    <DeleteItemModal></DeleteItemModal>
    <EditProjectModal></EditProjectModal>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapGetters } = createNamespacedHelpers("Tasks");

import DeleteItemModal from "./DeleteItemModal";
import EditProjectModal from "./EditProjectModal";
import EditStatusListModal from "./EditStatusListModal"
import EditWorkItemModal from "./EditWorkItemModal"
import SideBar from "./SideBar";
import WorkItemBoard from "./WorkItemBoard";

export default {
  name: "LandingPage",
  components: {
    SideBar,
    DeleteItemModal,
    EditProjectModal,
    EditStatusListModal,
    EditWorkItemModal,
    WorkItemBoard
  },
  methods: {
    ...mapActions(['loadTaskEntriesFromFile']),
    showModal(modalID) {
      this.$bvModal.show(modalID);
    }
  },
  computed: {
    ...mapState([
      "taskEntries",
      "selectedProjectName",
      "editProjectModal",
      "selectedItemID"])
  },
  mounted: function(){
    this.loadTaskEntriesFromFile();
  }
};
</script>

<style>
.main-page {
  font-weight: bold;
  color: rgb(235, 235, 235);
  margin-left: 250px; /* Same as the width of the sidebar */
}
.board-title {
  text-align: left;
  padding-left: 20px;
  padding-bottom: 20px;
  color: inherit;
}
</style>
