//import task_entries from "../../../../task_entries.json"
var fs = require("fs");

const state = {
  taskEntries: {},
  selectedItemID: '',
  selectedProjectName: '',
  selectedProjectTaskEntries: {},
  deleteItemModal: "deleteItemModal",
  editWorkItemModal: "editWorkItemModal",
  editStatusListModal: "editStatusListModal",
  editProjectModal: "editProjectModal"
}

const mutations = {
  LOAD_TASK_ENTRIES_FROM_FILE(state){
    let filepath = 'task_entries.json';
    fs.readFile(filepath, "utf8", (err, data) => {
      if (err) throw err;
      state.taskEntries = JSON.parse(data);
    });

    //state.selectedProjectName = state.taskEntries.projects[0].projectName;
  },
  COMMIT_TASK_ENTRIES_TO_FILE(state){
    let filepath = 'task_entries.json';
    fs.writeFileSync(filepath, JSON.stringify(state.taskEntries), "utf8", err => {
      if (err) throw err;
      console.log(`${filepath} saved`);
    });
  },
  SET_SELECTED_ITEM_ID(state, payload){
    state.selectedItemID = payload;
  },
  SET_SELECTED_PROJECT(state, payload){
    state.selectedProjectName = payload;

    let numberOfProjects = state.taskEntries.projects.length;
    let projects = state.taskEntries.projects;
    for (let i = 0; i < numberOfProjects; i++) {
      if (projects[i].projectName == payload) {
        state.selectedProjectTaskEntries =  projects[i].statusLists;
      }
    }
  }
}

const actions = {
  loadTaskEntriesFromFile({commit}){
    commit('LOAD_TASK_ENTRIES_FROM_FILE');
  },
  commitTaskEntriesToFile({commit}){
    commit('COMMIT_TASK_ENTRIES_TO_FILE');
  },
  setSelectedProject({commit}, payload){
    commit('SET_SELECTED_PROJECT', payload);
  },
  setSelectedItemID({commit}, payload){
    commit('SET_SELECTED_ITEM_ID', payload);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
