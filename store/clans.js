export const state = () => ({
  clans: [],
  clan: {},
  myClan: {}
})

export const getters = {
  clans: state => state.clans,
  clan: state => state.clan,
  myClan: state => state.myClan
}

export const mutations = {
  setClans (state, clans) {
    state.clans = clans
  },
  setClan (state, clan) {
    state.clan = clan
  },
  setMyClan (state, myClan) {
    state.myClan = myClan
  },
  addClan (state, clan) {
    state.clans = state.clans.unshift(clan)
  },
  editClan (state, updatedClan) {
    const index = state.clans.find(clan => clan.id === updatedClan.id)
    if (index !== -1) {
      state.clans.splice(index, 1, updatedClan)
    }
  },
  deleteClan (state, deleteClan) {
    state.clans = state.clans.filter(clan => clan.id !== deleteClan.id)
  }
}

export const actions = {
  getClans ({ commit }, res) {
    commit('setClans', res)
  },
  getClan ({ commit }, res) {
    commit('setClan', res)
  },
  getMyClan ({ commit }, res) {
    commit('setMyClan', res)
  },
  addClan ({ commit }, res) {
    commit('addClan', res)
  },
  updateClan ({ commit }, res) {
    commit('editClan', res)
  },
  deleteClan ({ commit }, res) {
    commit('deleteClan', res)
  }
}
