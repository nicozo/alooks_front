export const state = () => ({
  applications: []
})

export const getters = {
  applications: state => state.applications
}

export const mutations = {
  setApplications (state, applications) {
    state.applications = applications
  },
  read (state, readApplication) {
    const index = state.applications.findIndex(application => application.id === readApplication.id)

    if (index !== -1) {
      state.applications.splice(index, 1, readApplication)
    }
  }
}

export const actions = {
  getApplications ({ commit }, applications) {
    commit('setApplications', applications)
  },
  getReadApplication ({ commit }, readApplication) {
    commit('read', readApplication)
  }
}
