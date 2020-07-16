<template>
  <div class="board">
    <div class="board-group" v-for="(taskEntryList, key) in selectedProjectTaskEntries" :key="key">
      <h3 class="board-group-title">
        <span
          style="flex-grow: 10"
          @click="loadModal('', taskEntryList, editStatusListModal)"
        >{{taskEntryList.name}}</span>

        <div>
          <label for="colorPicker">
            <b-icon-brush @click="setSelectedItemDetails(taskEntryList)"></b-icon-brush>
          </label>
          <b-form-input
            type="color"
            id="colorPicker"
            style="display: none;"
            v-model="statusListColor"
          ></b-form-input>
        </div>

        <b-icon-pencil-square @click="loadModal('', taskEntryList, editStatusListModal)"></b-icon-pencil-square>
        <b-icon-trash @click.stop="loadModal('', taskEntryList, deleteItemModal)"></b-icon-trash>
      </h3>

      <draggable
        class="list-group"
        :list="taskEntryList.workItems"
        v-bind="dragOptions"
        @start="isDragging = true"
        @end="isDragging = false"
      >
        <transition-group type="transition" name="flip-list">
          <div
            :style="{backgroundColor: taskEntryList.color}"
            class="card list-group-item"
            v-for="workItem in taskEntryList.workItems"
            :key="workItem.id"
            :list="taskEntryList.workItems"
            @click="loadModal('', workItem, editWorkItemModal)"
            
          >
            <h4 class="card-title">
              <span style="flex-grow: 8">{{workItem.name}}</span>
              <b-icon-pencil-square @click="loadModal('', workItem, editWorkItemModal)"></b-icon-pencil-square>
              <b-icon-trash @click.stop="loadModal('', workItem, deleteItemModal)"></b-icon-trash>
            </h4>

            <p class="card-text">{{workItem.description}}</p>
            <p
              class="card-text"
              @click.stop="openFile(workItem.filepath)"
            >{{displayFilename(workItem.filepath)}}</p>
          </div>
        </transition-group>
      </draggable>

      <h4>
        <b-icon-plus-square @click="loadModal(taskEntryList.id, blankObject, editWorkItemModal)"></b-icon-plus-square>
      </h4>
    </div>

    <div id="addNewList">
      <h3>New Status</h3>
      <h4 class="board-group">
        <b-icon-plus-square @click="loadModal(selectedProjectID, blankObject, editStatusListModal)"></b-icon-plus-square>
      </h4>
    </div>
  </div>
</template>

<script>
var exec = require("child_process").exec;
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("Tasks");
import draggable from "vuedraggable";

export default {
  name: "WorkItemBoard",
  components: {
    draggable
  },
  methods: {
    // fileDrop(event, workItem) {
    //   event.preventDefault();
    //   this.setSelectedItemDetails(item);
    //   this.selectedItemBinding({
    //     value: event.dataTransfer.files[0].path,
    //     key: "filepath"
    //   });
    // },
    loadModal(parentID, item, modalID) {
      if (parentID != "") {
        item.parentItemID = parentID;
      }
      this.setSelectedItemDetails(item);
      this.$bvModal.show(modalID);
    },
    ...mapActions([
      "setSelectedItemDetails",
      "commitTaskEntriesToFile",
      "selectedItemBinding"
    ]),
    displayFilename(fullpath) {
      if (fullpath.includes("http")) {
        return fullpath;
      }
      let pathArray = [];
      if (fullpath.includes("/")) {
        pathArray = fullpath.split("/");
      } else {
        pathArray = fullpath.split("\\");
      }

      return pathArray[pathArray.length - 1];
    },
    getCommandLine() {
      switch (process.platform) {
        case "darwin":
          return "open";
        case "win32":
          return "start";
        case "win64":
          return "start";
        default:
          return "xdg-open";
      }
    },
    openFile(filepath) {
      exec(this.getCommandLine() + " " + filepath);
    }
  },
  computed: {
    ...mapState([
      "selectedProjectTaskEntries",
      "deleteItemModal",
      "editWorkItemModal",
      "editStatusListModal",
      "selectedProjectID",
      "blankObject"
    ]),
    dragOptions() {
      this.commitTaskEntriesToFile();
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    },
    statusListColor: {
      get() {
        return null;
      },
      set(value) {
        this.selectedItemBinding({ value: value, key: "color" });
      }
    }
  }
};
</script>

<style scoped>
.board {
  padding-left: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.board-group {
  width: 300px;
  flex-direction: column;
  flex-wrap: nowrap;
}
.board-group-title {
  text-align: left;
  display: flex;
  margin: 0px 20px 0px 20px;
}
.card {
  color: rgb(47, 52, 55);
  margin: 20px 10px 20px 10px;
  border-radius: 5px;
  border: 1px solid black;
  min-width: 250px;
}
.card:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.card:active {
  border: 2px solid black;
}
.card-title {
  text-align: left;
  display: flex;
}
.card-text {
  font-weight: initial;
  text-align: left;
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
#addNewList {
  width: 300px;
  text-align: center;
}
#fileSelector {}
</style>