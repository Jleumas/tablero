//import task_entries from "../../../../task_entries.json"
var fs = require("fs");

const state = {
  taskEntries: {},
  selectedProjectName: '',
  selectedProjectTaskEntries: {},

  selectedItem: {
    name: '',
    id: '',
    type: '',
    description: '',
    filepath: '',
    color: ''
  },

  deleteItemModal: "deleteItemModal",
  editWorkItemModal: "editWorkItemModal",
  editStatusListModal: "editStatusListModal",
  editProjectModal: "editProjectModal",

  blankObject: {
    name: '',
    id: '',
    type: '',
    description: '',
    filepath: '',
    color: ''
  }
}

const getters = {

}

const mutations = {
  //TODO
  DELETE_ITEM(state, payload) {
    return null;
  },
  //NEED TO TEST
  CREATE_ITEM(state, payload) {
    state.taskEntries.projects.push({
      "name": payload.name,
      "id": Math.floor(Math.random() * 100000),
      "type": payload.type,
      "description": payload.description,
      "filepath": payload.filepath,
      "color": payload.color
    });
    console.log('Hello from CREATE_ITEM!');
  },
  //KEEP --- WORKING
  SELECTED_ITEM_BINDING(state, payload) {
    state.selectedItem[payload.key] = payload.value;
  },
  //need to fix this, maybe use selected_item_binding instead????
  UPDATE_ITEM(state, payload) {
    for (let i = 0; i < state.taskEntries.projects.length; i++) {
      if (state.taskEntries.projects[i].id == state.id) {
        state.taskEntries.projects[i].projectName = state.payload.name;
      }
    }
  },
  //KEEP --- WORKING
  LOAD_TASK_ENTRIES_FROM_FILE(state) {
    let filepath = 'task_entries.json';
    fs.readFile(filepath, "utf8", (err, data) => {
      if (err) throw err;
      state.taskEntries = JSON.parse(data);
    });
  },
  //KEEP --- WORKING
  COMMIT_TASK_ENTRIES_TO_FILE(state) {
    let savingDisaabled = false;
    if (savingDisaabled) {
      console.log('Saving is currently disabled for your own damn good!');
    }
    else {
      let filepath = 'task_entries.json';
      fs.writeFileSync(filepath, JSON.stringify(state.taskEntries), "utf8", err => {
        if (err) throw err;
        console.log(`${filepath} saved`);
      });
    }
  },
  //KEEP --- WORKING
  SET_SELECTED_ITEM_DETAILS(state, payload) {
    state.selectedItem = payload;
  },
  //KEEP --- WORKING
  SET_SELECTED_PROJECT(state, payload) {
    state.selectedProjectName = payload;

    let numberOfProjects = state.taskEntries.projects.length;
    let projects = state.taskEntries.projects;
    for (let i = 0; i < numberOfProjects; i++) {
      if (projects[i].name == payload) {
        state.selectedProjectTaskEntries = projects[i].statusLists;
      }
    }
  }
}

const actions = {
  //TODO
  deleteItem({ commit }, payload) {
    console.log('deleteItem() dummy');
    return null;
  },
  //KEEP --- WORKING
  selectedItemBinding({ commit }, payload) {
    commit('SELECTED_ITEM_BINDING', payload);
  },
  //KEEP --- TEST
  editItem({ commit }, payload) {
    if (payload.id === 0) commit('CREATE_ITEM', payload);
    else commit('UPDATE_ITEM', payload);
    commit('COMMIT_TASK_ENTRIES_TO_FILE');
  },
  //KEEP --- WORKING
  setSelectedItemDetails({ commit }, payload) {
    commit('SET_SELECTED_ITEM_DETAILS', payload)
  },
  //KEEP --- WORKING
  loadTaskEntriesFromFile({ commit }) {
    commit('LOAD_TASK_ENTRIES_FROM_FILE');
  },
  //KEEP --- WORKING
  commitTaskEntriesToFile({ commit }) {
    commit('COMMIT_TASK_ENTRIES_TO_FILE');
  },
  //KEEP --- WORKING
  setSelectedProject({ commit }, payload) {
    commit('SET_SELECTED_PROJECT', payload);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
