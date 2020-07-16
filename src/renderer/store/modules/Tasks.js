var fs = require("fs");

const state = {
  taskEntries: {},
  selectedProjectName: '',
  selectedProjectID: '',
  selectedProjectTaskEntries: {},

  selectedItem: {
    name: '',
    id: '',
    type: '',
    description: '',
    filepath: '',
    color: '',
    parentItemID: ''
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
    color: '',
    parentItemID: ''
  }
}

const getters = {

}

const mutations = {
  //KEEP --- WORKING
  CLEAR_BLANK_OBJECT(state){
    state.blankObject.name = '';
    state.blankObject.id = '';
    state.blankObject.type = '';
    state.blankObject.description = '';
    state.blankObject.filepath = '';
    state.blankObject.color = '';
    state.blankObject.parentItemID = '';
  },
  //KEEP --- WORKING
  DELETE_ITEM(state, payload) {
    if (payload.type == 'project') {
      for (var i = 0; i < state.taskEntries.projects.length; i++) {
        if (state.taskEntries.projects[i].id == payload.id) {
          state.taskEntries.projects.splice(i, 1);
        }
      }
    }
    else if (payload.type == 'statusList') {
      for (var i = 0; i < state.taskEntries.projects.length; i++) {
        for (var j = 0; j < state.taskEntries.projects[i].statusLists.length; j++) {
          if (state.taskEntries.projects[i].statusLists[j].id == payload.id) {
            state.taskEntries.projects[i].statusLists.splice(j, 1);
          }
        }
      }
    }
    else if (payload.type == 'workItem') {
      for (var i = 0; i < state.taskEntries.projects.length; i++) {
        for (var j = 0; j < state.taskEntries.projects[i].statusLists.length; j++) {
          for (var k = 0; k < state.taskEntries.projects[i].statusLists[j].workItems.length; k++) {
            if (state.taskEntries.projects[i].statusLists[j].workItems[k].id == payload.id) {
              state.taskEntries.projects[i].statusLists[j].workItems.splice(k, 1);
            }
          }
        }
      }
    }
  },
  //KEEP --- WORKING
  CREATE_ITEM(state, payload) {
    if (payload.type == 'project') {
      state.taskEntries.projects.push({
        "name": payload.name,
        "id": String(Math.floor(Math.random() * 100000)),
        "type": payload.type,
        "description": payload.description,
        "filepath": payload.filepath,
        "color": payload.color,
        "parentItemID": "1",
        "statusLists": []
      })
    }
    else if (payload.type == 'statusList') {
      for (var proj of state.taskEntries.projects) {
        if (proj.id == payload.parentItemID) {
          proj.statusLists.push({
            "name": payload.name,
            "id": String(Math.floor(Math.random() * 100000)),
            "type": payload.type,
            "description": payload.description,
            "filepath": payload.filepath,
            "color": payload.color,
            "parentItemID": payload.parentItemID,
            "workItems": []
          })
        }
      }
    }
    else if (payload.type == 'workItem') {
      for (var proj of state.taskEntries.projects) {
        for (var statList of proj.statusLists) {
          if (statList.id == payload.parentItemID) {
            statList.workItems.push({
              "name": payload.name,
              "id": String(Math.floor(Math.random() * 100000)),
              "type": payload.type,
              "description": payload.description,
              "filepath": payload.filepath,
              "color": payload.color,
              "parentItemID": payload.parentItemID
            })
          }
        }
      }
    }
    else {
      console.log(`Type ${payload.type} does not exist!!`);
    }
  },
  //KEEP --- WORKING
  SELECTED_ITEM_BINDING(state, payload) {
    state.selectedItem[payload.key] = payload.value;
  },
  //KEEP --- WORKING
  LOAD_TASK_ENTRIES_FROM_FILE(state) {
    let filepath = 'task_entries.json';
    if (fs.existsSync(filepath)){
      fs.readFile(filepath, "utf8", (err, data) => {
        if (err) throw err;
        state.taskEntries = JSON.parse(data);
      });
    }
    else
    {
      let task_entries_template = '{"projects":[]}';
      fs.writeFile(filepath, JSON.parse(task_entries_template), "utf8", err => {
        if (err) throw err;
        state.taskEntries = JSON.parse(task_entries_template);
        console.log("new file created");
      })
    }
  },
  //KEEP --- WORKING
  COMMIT_TASK_ENTRIES_TO_FILE(state) {
    let savingDisaabled = false;
    if (savingDisaabled) {
      console.log('Saving is currently disabled for your own damn good!');
    }
    else {
      let filepath = 'task_entries.json';
      fs.writeFile(filepath, JSON.stringify(state.taskEntries), "utf8", err => {
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
        state.selectedProjectID = projects[i].id;
      }
    }
  }
}

const actions = {
  //KEEP --- WORKING
  deleteItem({ commit }, payload) {
    commit('DELETE_ITEM', payload);
    commit('CLEAR_BLANK_OBJECT');
    commit('COMMIT_TASK_ENTRIES_TO_FILE');

  },
  //KEEP --- WORKING
  selectedItemBinding({ commit }, payload) {
    commit('SELECTED_ITEM_BINDING', payload);
    commit('COMMIT_TASK_ENTRIES_TO_FILE');
  },
  //KEEP --- TEST
  createItem({ commit }, payload) {
    if (payload.id == '') {
      commit('CREATE_ITEM', payload);
      commit('CLEAR_BLANK_OBJECT');
    }
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
