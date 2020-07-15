<template>
  <div class="main-page">
    <SideBar></SideBar>
    <h1
      class="board-title"
      @click="loadModal('', blankObject, editProjectModal)"
    >{{selectedProjectName}}</h1>
    <WorkItemBoard></WorkItemBoard>
    <EditWorkItemModal></EditWorkItemModal>
    <EditStatusListModal></EditStatusListModal>
    <DeleteItemModal></DeleteItemModal>
    <EditProjectModal></EditProjectModal>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("Tasks");

import DeleteItemModal from "./DeleteItemModal";
import EditProjectModal from "./EditProjectModal";
import EditStatusListModal from "./EditStatusListModal";
import EditWorkItemModal from "./EditWorkItemModal";
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
    ...mapActions(["loadTaskEntriesFromFile", "setSelectedItemDetails"]),
    loadModal(parentID, item, modalID) {
      if (parentID != "") {
        item.parentItemID = '1';
      }
      this.setSelectedItemDetails(item);
      this.$bvModal.show(modalID);
    }
  },
  computed: {
    ...mapState([
      "taskEntries",
      "selectedProjectName",
      "editProjectModal",
      "selectedItem",
      "blankObject"
    ])
  },
  mounted: function() {
    this.loadTaskEntriesFromFile();
  }
};
</script>

<style>
.main-page {
  font-weight: bold;
  color: rgb(235, 235, 235);
  margin-left: 350px; /* Same as the width of the sidebar */
}
.board-title {
  text-align: left;
  padding-left: 20px;
  padding-bottom: 20px;
  color: inherit;
}
</style>
