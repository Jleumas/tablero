import task_entries from "../../../../task_entries.json"

const state = {
  taskEntries: task_entries,
  selectedProjectName: '',
  selectedProjectTaskEntries: {},
  deleteItemModal: "deleteItemModal",
  editWorkItemModal: "editWorkItemModal",
  editStatusListModal: "editStatusListModal",
  editProjectModal: "editProjectModal"
}

const mutations = {
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
  setSelectedProject({commit}, payload){
    commit('SET_SELECTED_PROJECT', payload);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
