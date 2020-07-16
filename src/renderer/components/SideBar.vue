<template>
  <div class="sidenav">
      <draggable
        class="list-group"
        :list="taskEntries.projects"
        v-bind="dragOptions"
        @start="isDragging = true"
        @end="isDragging = false"
      >
        <h3 class="projectTitle" @click="setSelectedItemDetails(project)" :list="taskEntries.projects" v-for="project in taskEntries.projects" :key="project.projectName">
          <span style="flex-grow: 10" @click="setSelectedProject(project.name)">{{project.name}}</span>
          <b-icon-pencil-square @click="loadModal(project, editProjectModal)"></b-icon-pencil-square>
          <b-icon-trash @click="loadModal(project, deleteItemModal)"></b-icon-trash>
        </h3>
      </draggable>
    <h4>
      <b-icon-plus-square @click="loadModal(blankObject, editProjectModal)"></b-icon-plus-square>
    </h4>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("Tasks");
import draggable from "vuedraggable";

export default {
  components: {
    draggable,
  },
  methods: {
    ...mapActions([
      "setSelectedProject",
      "setSelectedItemDetails",
      "commitTaskEntriesToFile"
    ]),
    loadModal(item, modalID) {
      if (item == this.blankObject) {
        this.setSelectedItemDetails(
          JSON.parse(JSON.stringify(this.blankObject))
        );
      } else {
        this.setSelectedItemDetails(item);
      }
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
      "blankObject",
      "selectedItem"
    ]),
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  }
};
</script>

<style scoped>
.projectTitle {
  display: flex;
  margin: 0px 20px 0px 20px;
}
.sidenav {
  height: 100%;
  min-width: 300px;
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
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>