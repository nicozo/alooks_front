export const state = () => ({
  applications: [],
  myApplications: []
})

export const getters = {
  applications: state => state.applications,
  myApplications: state => state.myApplications
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
  },
  setMyApplications (state, myApplications) {
    state.myApplications = myApplications
  },
  addMyApplication (state, myApplication) {
    state.myApplications.push(myApplication)
  }
}

export const actions = {
  getApplications ({ commit }, applications) {
    commit('setApplications', applications)
  },
  getReadApplication ({ commit }, readApplication) {
    commit('read', readApplication)
  },
  getMyApplications ({ commit }, myApplications) {
    commit('setMyApplications', myApplications)
  },
  getMyApplication ({ commit }, myApplication) {
    commit('addMyApplication', myApplication)
  }
}
